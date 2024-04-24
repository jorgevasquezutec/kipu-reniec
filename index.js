const axios = require('axios')
const fs = require('fs')
const config = require('./config')
const {wait,whitePhoto} = require('./util')

const { RENIEC_URL, RENIEC_TOKEN ,DNI_PATH} = config


function getPhotoByDni(dni, path=DNI_PATH) {
    return new Promise((resolve, reject) => {
        const url = RENIEC_URL;
        const token = RENIEC_TOKEN;
        const params = { dni, token };

        axios.get(url, { params })
            .then(response => {
                console.log(`Processing ${dni}`);
                const data = response.data;
                if (data['CoError'] !== '9999') {
                    reject(new Error(`Error processing ${dni}: ${data['CoError']}`));
                } else {
                    const photo = data['dataJson']['foto'];
                    whitePhoto(photo,`${path}/${dni}.jpg`)
                    .then(()=>resolve())
                    .catch(error => reject(error))

                }
            })
            .catch(error => {
                reject(error);
            });
    });
}


function main () {
    const args = process.argv.slice(2)

    const dniIndex = args.indexOf('--dni')

    if (dniIndex === -1) {
        console.error('DNI is required')
        return
    }
    const dni = args[dniIndex + 1]
    getPhotoByDni(dni)
}



(()=> {
    main()
})()


module.exports= {
    getPhotoByDni
}