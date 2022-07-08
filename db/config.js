
const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB conectada exitosamente');

    } catch ( error ) {

        console.log( error );
        throw new Error ('Error al conectar la DB');
    }
}

module.exports = {
    dbConnection
}






