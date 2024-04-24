const {connection} = require('./db')
const axios = require('axios')
const {existDniOnDisk,whitePhoto} = require('./util')

async function getPhotoByUrl(dni, path='./other',url) {
    return new Promise((resolve, reject) => {
        axios.get(url,{
            responseType: 'arraybuffer'
        }).then((response)=> {
            whitePhoto(response.data,
                `${path}/${dni}.jpg`)
                .then(()=>resolve())
                .catch(error => reject(error))
        })
       
    });
}


async function downloadPhotoUrl(results, path='./other'){
    const chunkSize = 20;
    for (let i = 0; i < results.length; i += chunkSize) {
        const chunkResults = results.slice(i, i + chunkSize);
        const promises = [];
        for (const { id, document_number ,image_photo} of chunkResults) {
            if (!existDniOnDisk(document_number,path)) {
                promises.push(
                    new Promise((resolve, reject) => {
                        console.log(`Processing ${document_number}`);
                        getPhotoByUrl(document_number,path, image_photo)
                            .then(() => resolve())
                            .catch(error => reject(error));
                    })
                );
            }
        }
        if(promises.length === 0) continue;

        try {
            await Promise.all(promises);
            console.log(`Processed ${promises.length} photos`);
        } catch (error) {
            console.error(error);
        }
    }
}


async function main() {
    try {
        const [results, fields] = await connection.promise().query(
            `select id,document_number,image_photo from participants where image_photo is not null and id>540;`
        );
        await downloadPhotoUrl(results,'./other4');
        process.exit(0);
        
    } catch (error) {
        console.error(error);
    } finally {
        connection.end(); // Cerrar la conexión a la base de datos cuando termine
    }
}

(async () => {
    main()
})()