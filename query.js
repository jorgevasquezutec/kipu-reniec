const { getPhotoByDni } = require('./index');
const { DNI_PATH} = require('./config')
const {connection} = require('./db')
const {existDniOnDisk} = require('./util')

// Crear una única conexión a la base de datos


// Función para descargar fotos de DNI de manera sincrónica
async function downloadPhotos(results, path=DNI_PATH) {
    const chunkSize = 20;
    for (let i = 0; i < results.length; i += chunkSize) {
        const chunkResults = results.slice(i, i + chunkSize);
        const promises = [];
        for (const { id, document_number } of chunkResults) {
            if (!existDniOnDisk(document_number)) {
                promises.push(
                    new Promise((resolve, reject) => {
                        console.log(`Processing ${document_number}`);
                        getPhotoByDni(document_number,path)
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

// Función principal
async function main() {
    try {
        const [results, fields] = await connection.promise().query(
            `select id,document_number,image_photo from participants where document_number in (
                '18042258',
                '17921624',
                '06807601',
                '16786492',
                '17824838',
                '17897720'
            )`
        );
        await downloadPhotos(results,'./other6');
    } catch (error) {
        console.error(error);
    } finally {
        connection.end(); // Cerrar la conexión a la base de datos cuando termine
    }
}

main(); // Llamar a la función principal
