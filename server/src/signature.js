const crypto = require('crypto')

function trim_b64(text) {
    text.replace(/=*$/, '')
}

function sign(text, secret) {
    return trim_b64(crypto.createHmac('sha256', secret).update(text).digest('base64'))
}

function encode(payload, secret) {
    const text = trim_b64(btoa(JSON.stringify(payload)));
    const signature = sign(text, secret);
    return `${text}.${signature}`;
}

function decode(token, secret) {
    const [text, signature] = token.split('.');
    const expected = sign(text, secret);
    if (trim_b64(signature) === expected) {
        return JSON.parse(atob(text));
    }
    return null;
}

exports.encode = encode;
exports.decode = decode;