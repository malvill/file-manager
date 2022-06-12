import fs from 'fs';
import { getHomeDir } from './os.js';
import {OPERATION_FAILED_ERR_MESSAGE} from "./constants.js";

const homeDir = getHomeDir();
let currentDir = updateCurrentDirectory();

function logCurrentDirectory() {
    console.log(`You are currently in ${currentDir}`);
}

function updateCurrentDirectory() {
    return process.cwd();
}

function getCurrentDirectory() {
    return currentDir;
}

function goToUpperDirectory() {
    if (updateCurrentDirectory() === homeDir) {
        console.log('I can\'t go higher');
        return;
    }
    process.chdir('../');
    currentDir = updateCurrentDirectory();
    logCurrentDirectory();
}

function goToHomeDir() {
    goToPath(homeDir);
}

function goToPath(path) {
    try {
        process.chdir(path);
        currentDir = updateCurrentDirectory();
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
    getCurrentDirectory,
    goToUpperDirectory,
    listAllInCurrentDirectory,
    goToPath,
    goToHomeDir
}

