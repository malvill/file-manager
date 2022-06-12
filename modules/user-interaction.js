let username;

export function checkArgsForUsername(userInputArgs) {
    const keyWithSymbols = '--username=';
    const usernameArgs = userInputArgs.filter(arg => arg.startsWith(keyWithSymbols));
    if (userInputArgs.length > 1) {
        console.log('Don\'t mess with me!')
    }
    const usernameArgsLength = usernameArgs.length;
    if (usernameArgsLength >= 1) {
        if (usernameArgsLength > 1) {
            console.log('One name is enough. I\'ll take the first one.')
        }
        const usernameRegexp = new RegExp(`(?<=${keyWithSymbols})\\w+`)
        const usernameRaw = usernameArgs[0].match(usernameRegexp);
        if (!usernameRaw) {
            console.log('Something went wrong. You can try again...')
        }
        username = usernameRaw[0][0].toUpperCase() + usernameRaw[0].slice(1);
        return username;
    } else {
        console.log('I need your name, bro');
    }
}


export function greetUser() {
    console.log(`Welcome to the File Manager, ${username}`)
}


export default {
    checkArgsForUsername,
    greetUser
}