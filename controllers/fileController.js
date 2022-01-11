const fs = require('fs').promises;
const os = require('os');

function validateUsername(username) {
    return Boolean(username);
}

async function usersList() {
    let usernameFD = null;

    try {
        usernameFD = await openFile();
        let usernames = await read(usernameFD);
        
        if (!usernames) throw new Error('No users found!');

        usernames = usernames.split('\n').filter(user => user !== '');
        return usernames;
    } catch (err) {
        throw err;
    } finally {
        if (usernameFD) closeFile(usernameFD);
    }

}

async function saveUsername(username) {
    let usernameFD = null;
    try{
        if (!validateUsername(username)) throw new Error('User cannot be empty');
    
        usernameFD = await openFile();
        let present = await userPresent(usernameFD, username);
        
        if (present) throw new Error('User already exists!');

        await append(usernameFD, username);
    } catch (err) {
        throw err;
    } finally {
        if (usernameFD) closeFile(usernameFD);
    }
    
}

async function userPresent(fileDescriptor, username) {
    let usernames = await read(fileDescriptor);
    const EOL = '\n';

    const foundUsername = usernames.split(EOL).filter(user => user.trim().toLowerCase() === username.trim().toLowerCase());
    
    if (foundUsername.length > 0) return true;
    
    return false;
}

async function openFile() {
    const FILENAME = './users.txt';
    return await fs.open(FILENAME, 'a+');
}

async function closeFile(fileDescriptor) {
    return await fileDescriptor.close();
}

async function append(fileDescriptor, data) {
    const OPTIONS = { encoding: 'utf8' };
    const EOL = '\n';
    await fs.appendFile(fileDescriptor, data + EOL, OPTIONS);
}

async function read(fileDescriptor) {
    const OPTIONS = { encoding: 'utf8' };
    return await fs.readFile(fileDescriptor, OPTIONS);
}

exports.saveUsername = saveUsername;
exports.usersList = usersList;