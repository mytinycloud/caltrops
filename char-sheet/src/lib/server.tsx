const SERVER_URI = 'https://nad7hr2keheheljlwvlkiyjtq40mwgzl.lambda-url.ap-southeast-2.on.aws/'

export interface ServerItem {
    owner: string,
    time: string,
    id: string,
    title: string,
    content?: any,
}

async function post(body: any): Promise<any> {
    const result = await fetch(SERVER_URI, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return result.json()
}

async function listContent(user: string): Promise<ServerItem[]> {
    const result = await post({
        user: user,
        list: "*",
    })
    return result.list;
}

async function readContent(user: string, id: string): Promise<ServerItem | null> {
    const result = await post({
        user: user,
        read: [ id ]
    })
    return result.read.length ? result.read[0] : null
}

async function writeContent(user: string, id: string, title: string, content: any): Promise<boolean> {
    const result = await post({
        user: user,
        write: [
            {
                id: id,
                title: title,
                content: content,
            }
        ]
    })
    return true;
}

const server = {
    list: listContent,
    read: readContent,
    write: writeContent
}

export default server;