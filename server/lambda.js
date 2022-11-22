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
    }).promise()
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

    let reply = {};

    if (!authenticate(body.user)) {
        return errorResponse(401, "Unauthorised");
    }

    if (body.write) {
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
        try {
            for (const uid of body.delete) {
                await deleteContent(uid)
            }
        } catch (error) {
            return errorResponse(500, "Error deleting content", error);
        }
    }

    if (body.list) {
        try {
            reply.list = await listContent(body.user);
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
