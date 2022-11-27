const crypto = require('crypto')

function sign(text, secret) {
    return crypto.createHmac('sha256', secret).update(text).digest('base64')
}

function encode(payload, secret) {
    const text = btoa(JSON.stringify(payload));
    const signature = sign(text, secret);
    return `${text}.${signature}`;
}

function decode(token, secret) {
    const [text, signature] = token.split('.');
    const expected = sign(text, secret);
    if (signature === expected) {
        return JSON.parse(atob(text));
    }
    return null;
}

exports.encode = encode;
exports.decode = decode;