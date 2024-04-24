
const { DNI_PATH} = require('./config')
const fs = require('fs')

function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

function existDniOnDisk (dni, path=DNI_PATH) {
    return fs.existsSync(`${path}/${dni}.jpg`)
}


async function whitePhoto (data, full_path) {
    //`${path}/${dni}.jpg`
    return new Promise((resolve, reject) => {
        fs.writeFile(full_path, data, 'base64', (err) => {
        if (err) {
            reject(err);
        } else {
            console.log('Photo saved');
            resolve();
        }
        })
    })
}




module.exports = {
    wait,
    existDniOnDisk,
    whitePhoto
}