import fs from 'fs';
import {OPERATION_FAILED_ERR_MESSAGE} from './constants.js';
import path, { dirname } from 'path';
import nwd from "./nwd.js";

const fsPromises = fs.promises;
let currentDir;

function printFileContent(path) {
    const readable = fs.createReadStream(path);
    readable
        .on('error', (_) => {
            console.log(OPERATION_FAILED_ERR_MESSAGE)
        })
        .pipe(process.stdout);
}

async function deleteFile(path) {
    await fsPromises.rm(path, (err) => {
        if (err) {
            console.log(OPERATION_FAILED_ERR_MESSAGE)
        } else {
            console.log('The file was deleted')
        }
    })
}

async function copyFile(srcPath, destFolder) {
    const __dirname = dirname(destFolder);
    const filename = path.basename(srcPath);
    const destPath = path.join(__dirname, destFolder, filename);

    try {
        await fsPromises.copyFile(srcPath, destPath).then(() => console.log('The file was copied'));
    } catch {
        console.log(OPERATION_FAILED_ERR_MESSAGE)
    }
}

async function moveFile(srcPath, destFolder) {
    const __dirname = dirname(destFolder);
    const filename = path.basename(srcPath);
    const destPath = path.join(__dirname, destFolder, filename);

    try {
        await fsPromises.copyFile(srcPath, destPath);
        await fsPromises.rm(srcPath).then(() => {
            console.log(`The file '${filename}' was successfully moved to ${destFolder}`)
        })
    } catch {
        console.log(OPERATION_FAILED_ERR_MESSAGE)
    }
}

async function renameFile(filePath, newName) {
    const __dirname = dirname(filePath);
    const newFilePath = path.join(__dirname, newName);

    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.log(OPERATION_FAILED_ERR_MESSAGE);
        } else {
            console.log('The file was renamed')
        }
    })
}

async function createFile(fileName) {
    currentDir = nwd.getCurrentDirectory();
    const newFilePath = path.join(currentDir, fileName);

    try {
        await fsPromises.open(newFilePath, 'w')
            .then(() => console.log(`The file '${fileName}' was created in a current folder`));
    } catch {
        console.log(OPERATION_FAILED_ERR_MESSAGE);
    }
}

export default {
    printFileContent,
    deleteFile,
    moveFile,
    copyFile,
    renameFile,
    createFile
}