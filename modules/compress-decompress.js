import zlib from 'zlib';
import fs from 'fs';
import {pipeline} from 'stream';
import {OPERATION_FAILED_ERR_MESSAGE} from "./constants.js";

export function compressFile(filePath, compressedFilePath) {
    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream(compressedFilePath);
    const brotliCompress = zlib.createBrotliCompress();

    pipeline(
        readable,
        brotliCompress,
        writable,
        err => {
            if (err) {
                console.log(OPERATION_FAILED_ERR_MESSAGE)
            } else {
                console.log('The file was successfully compressed')
            }
        }
    )
}

export function decompressFile(compressedFilePath, filePath) {
    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream(compressedFilePath);
    const brotliDecompress = zlib.createBrotliDecompress();

    pipeline(
        readable,
        brotliDecompress,
        writable,
        err => {
            if (err) {
                console.log(OPERATION_FAILED_ERR_MESSAGE);
            } else {
                console.log('The file was successfully decompressed')
            }
        }
    )

}
