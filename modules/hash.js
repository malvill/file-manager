import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { OPERATION_FAILED_ERR_MESSAGE } from "./constants.js";

export async function calculateHash(filePath) {
    const readable = createReadStream(filePath);
    const hash = createHash('sha256');

    return new Promise(resolve => {
        readable
            .on('error', (_) => console.log(OPERATION_FAILED_ERR_MESSAGE))
            .on('data', data => hash.update(data))
            .on('end', () => resolve(hash.digest('hex')))
    })
}
