function getCommandAndArgsFromReadline(line) {
    const lineSplitted = line.trim().split(' ');
    return {
        command: lineSplitted[0],
        args: lineSplitted.slice(1)
    }
}


export default {
    getCommandAndArgsFromReadline
}