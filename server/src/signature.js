const crypto = require('crypto')

function sign(text, secret) {
    crypto.createHmac('sha256', secret).update(text).digest('base64')
}

function encode(payload, secret) {
    const text = JSON.stringify(payload);
    const signature = sign(text, secret);
    return `${atob(text)}.${atob(signature)}`;
}

function decode(token, secret) {
    const components = token.split('.');
    const text = btoa(components[0]);
    const signature = btoa(components[1]);
    const expected = sign(text, secret);
    if (signature === expected) {
        return JSON.parse(text);
    }
    return null;
}

export default Signature = {
    encode: encode,
    decode: decode,
};
