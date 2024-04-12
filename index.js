const axios = require('axios')
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

const { RENIEC_URL, RENIEC_TOKEN } = process.env

function getPhotoByDni (dni) {
    const url = RENIEC_URL
    const token = RENIEC_TOKEN
    const params = {
        dni,
        token
    }

    axios.get(url, {params})
        .then(response => {
            const data = response.data
            const photo = data['dataJson']['foto'];
            fs.writeFile(`${dni}.jpg`, photo, 'base64', (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log('Photo saved')
                }
            })
            

        })
        .catch(error => {
            console.error(error)
        })
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