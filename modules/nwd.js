import fs from 'fs';
import { getHomeDir } from './os.js';
import {OPERATION_FAILED_ERR_MESSAGE} from "./constants.js";

const homeDir = getHomeDir();
let currentDir = getCurrentDirectory();

function logCurrentDirectory() {
    console.log(`You are currently in ${currentDir}`);
}

function getCurrentDirectory() {
    return process.cwd();
}

function goToUpperDirectory() {
    if (getCurrentDirectory() === homeDir) {
        console.log('I can\'t go higher');
        return;
    }
    process.chdir('../');
    currentDir = getCurrentDirectory();
    logCurrentDirectory();
}

function goToHomeDir() {
    goToPath(homeDir);
}

function goToPath(path) {
    try {
        process.chdir(path);
        currentDir = getCurrentDirectory();
        logCurrentDirectory();
    } catch {
        console.log(OPERATION_FAILED_ERR_MESSAGE);
    }
}

function listAllInCurrentDirectory() {
    fs.readdir(currentDir, (_, files) => {
        console.log(files);
    })
}

export default {
    goToUpperDirectory,
    listAllInCurrentDirectory,
    goToPath,
    goToHomeDir
}

