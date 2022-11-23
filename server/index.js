const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'caltrops-sheets';

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

function authenticate(user) {
    return !!user;
}

exports.handler = async (event) => {

    let body = null;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return errorResponse(400, "Error parsing body", error);
    }

    const authenticated = authenticate(body.user)
    let reply = {};

    if (body.write) {
        if (!authenticated) {
            return errorResponse(401, "Unauthorised");
        }
        try {
            for (const info of body.write) {
                await writeContent(info.id, info.title, body.user, info.content);
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
        if (!authenticated) {
            return errorResponse(401, "Unauthorised");
        }
        try {
            for (const uid of body.delete) {
                await deleteContent(uid)
            }
        } catch (error) {
            return errorResponse(500, "Error deleting content", error);
        }
    }

    if (body.list) {
        if (!authenticated) {
            return errorResponse(401, "Unauthorised");
        }
        try {
            let items = await listContent(body.user);
            reply.list = items.sort( (a,b) => b.time.localeCompare(a.time) )
        } catch (error) {
            return errorResponse(500, "Error listing content", error);
        }
    }

    const response = {
        statusCode: 200,
        headers: HEADERS,
        body: reply,
    };
    return response;
};
