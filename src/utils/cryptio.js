import { AES, enc } from 'crypto-js';

const encrypt = (token, encryptionKey) => AES.encrypt(token, encryptionKey).toString();

const decrypt = (token, encryptionKey) => AES.decrypt(token, encryptionKey).toString(enc.Utf8);

export { encrypt, decrypt };
