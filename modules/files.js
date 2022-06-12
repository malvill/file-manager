import fs from 'fs';
import {OPERATION_FAILED_ERR_MESSAGE} from './constants.js';


function printFileContent(path) {
    const readable = fs.createReadStream(path);
    readable
        .on('error', (_) => {
            console.log(OPERATION_FAILED_ERR_MESSAGE)
        })
        .pipe(process.stdout);
}

export default {
    printFileContent
}