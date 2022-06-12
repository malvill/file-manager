import readline from 'readline';
import nwd from "./modules/nwd.js";
import readlineArgs from './modules/readline-args.js';
import files from './modules/files.js';
import { calculateHash } from "./modules/hash.js";
import { checkArgsForUsername, greetUser } from "./modules/user-interaction.js";
import { getSystemUsername, getHomeDir, getEOL, getCpus, getArchitecture } from "./modules/os.js";
import { compressFile, decompressFile } from './modules/compress-decompress.js'

let rl;

const userInputArgs = process.argv.slice(2);
const username = checkArgsForUsername(userInputArgs);

if (username) {
    greetUser();
    nwd.goToHomeDir();
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}

const invalidInputErrMessage = 'Invalid input';

rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
    rl.close();
})

rl.on('line', async (lineRaw) => {
    const { command, args } = readlineArgs.getCommandAndArgsFromReadline(lineRaw);
    const firstArg = args[0] ?? '';
    const secondArg = args[1] ?? '';
    switch (command) {
        case 'up':
            nwd.goToUpperDirectory();
            break
        case 'cd':
            nwd.goToPath(firstArg);
            break
        case 'ls':
            nwd.listAllInCurrentDirectory(firstArg);
            break
        case 'cat':
            files.printFileContent(firstArg);
            break
        case 'add':
            await files.createFile(firstArg);
            break
        case 'rn':
            await files.renameFile(firstArg, secondArg);
            break;
        case 'cp':
            await files.copyFile(firstArg, secondArg);
            break;
        case 'mv':
            await files.moveFile(firstArg, secondArg);
            break;
        case 'rm':
            await files.deleteFile(firstArg);
            break;
        case 'os':
            switch (firstArg) {
                case '--EOL':
                    console.log(getEOL());
                    break;
                case '--cpus':
                    console.log(getCpus());
                    break;
                case '--homedir':
                    console.log(getHomeDir());
                    break;
                case '--username':
                    console.log(getSystemUsername());
                    break;
                case '--architecture':
                    console.log(getArchitecture());
                    break;
                default:
                    console.log(invalidInputErrMessage)
                    break;
            }
            break;
        case 'hash':
            console.log(await calculateHash(firstArg))
            break;
        case 'compress':
            compressFile(firstArg, secondArg);
            break;
        case 'decompress':
            decompressFile(firstArg, secondArg);
            break;
        case '.exit':
            console.log(`Thank you for using File Manager, ${username}!`);
            rl.close();
            break;
        default:
            console.log(invalidInputErrMessage)
            break;
    }
})


