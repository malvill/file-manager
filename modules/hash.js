import {createReadStream} from 'fs';
import {OPERATION_FAILED_ERR_MESSAGE} from "./constants.js";

export async function calculateHash(filePath) {
    try {
        const readable = createReadStream(filePath);
        const hash = crypto.createHash('sha256');

        return new Promise(resolve => {
            readable.on('data', data => hash.update(data)).on('end', () => resolve(hash.digest('hex')))
        })
    } catch {
        console.log(OPERATION_FAILED_ERR_MESSAGE)
    }
}
