import os from 'os';

const homedir = os.homedir();
const cpusNumber = os.cpus();
const eol = os.EOL;
const systemUsername = os.userInfo().username;
const architecture = os.arch();

export function getHomeDir() {
    return homedir;
}

export function getCpus() {
    return cpusNumber;
}

export function getEOL() {
    return eol;
}

export function getSystemUsername() {
    return systemUsername;
}

export function getArchitecture() {
    return architecture;
}