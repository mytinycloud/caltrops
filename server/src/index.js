const AWS = require('aws-sdk');
const Signature = require('./signature')

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'caltrops-sheets';
const CALTROPS_PSK = process.env.caltrops_psk;

const HEADERS = {
    'Content-Type': 'application/json',
};

async function writeContent(uid, title, user, content) {
    const item = {
        "id": uid,
        "owner": user,
        "title": title,
        "content": content,
        "time": (new Date()).toISOString()
    };
    await db.put({
        TableName: TABLE_NAME,
        Item: item
    }).promise();
}

async function deleteContent(uid) {
    await db.delete({
        TableName: TABLE_NAME,
        Key: {
            id: uid,
        }
    }).promise();
}

async function canDelete(token, uid) {
    if (!token) { return false; }
    let item = await readContent(uid);
    return (item !== null) && (item.owner === token.user);
}

async function canWrite(token, uid) {
    if (!token) { return false; }
    let item = await readContent(uid);
    return (item === null) || (item.owner === token.user);
}

function canSign(token) {
    if (!token) { return false; }
    return !!token.signer;
}

function validateToken(token) {
    try {
        token = Signature.decode(body.token, CALTROPS_PSK);
        if (!token.user) {
            return null;
        }
        return token;
    } catch {
        return null;
    }
}

async function listContent(user) {
    return (await db.query({
        TableName: TABLE_NAME,
        IndexName: "owner-index",
        KeyConditionExpression: "#o = :o",
        ExpressionAttributeValues: {
            ":o": user
        },
        ExpressionAttributeNames: {
            "#o": "owner"
        },
        Select: "ALL_PROJECTED_ATTRIBUTES"
    }).promise()).Items;
}

async function readContent(uid) {
    const response = await db.get({
        TableName: TABLE_NAME,
        Key: {
            id: uid,
        }
    }).promise();
    return response.Item ?? null;
}

function errorResponse(status, source, error = undefined) {
    return {
        statusCode: status,
        headers: HEADERS,
        body: {
            "error": error === undefined ? source : `${source}: ${error.toString()}`
        },
    };
}

exports.handler = async (event) => {

    let body = null;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return errorResponse(400, "Error parsing body", error);
    }

    let token = null;
    if (body.token) {
        token = validateToken(body.token)
        if (!token) {
            return errorResponse(400, "Invalid token", error); 
        }
    }

    let reply = {};

    if (body.write) {
        try {
            for (const info of body.write) {
                if (await canWrite(token, info.id)) {
                    await writeContent(info.id, info.title, token.user, info.content);
                } else {
                    return errorResponse(401, "Unauthorised");
                }
            }
        } catch (error) {
            return errorResponse(500, "Error writing content", error);
        }
    }

    if (body.read) {
        try {
            let read = [];
            for (const uid of body.read) {
                read.push(await readContent(uid));
            }
            reply.read = read;
        } catch (error) {
            return errorResponse(500, "Error reading content", error);
        }
    }

    if (body.delete) {
        try {
            for (const uid of body.delete) {
                if (await canDelete(token, uid)) {
                    await deleteContent(uid);
                } else {
                    return errorResponse(401, "Unauthorised"); 
                }
            }
        } catch (error) {
            return errorResponse(500, "Error deleting content", error);
        }
    }

    if (body.list) {
        if (!token) {
            return errorResponse(401, "Unauthorised");
        }
        try {
            let items = await listContent(token.user);
            reply.list = items.sort( (a,b) => b.time.localeCompare(a.time) );
        } catch (error) {
            return errorResponse(500, "Error listing content", error);
        }
    }

    if (body.sign) {
        if (!canSign(token)) {
            return errorResponse(401, "Unauthorised");
        }
        let signed = [];
        for (const item of body.sign) {
            signed.push( Signature.encode(item, CALTROPS_PSK) );
        }
        reply.sign = signed;
    }

    const response = {
        statusCode: 200,
        headers: HEADERS,
        body: reply,
    };
    return response;
};
