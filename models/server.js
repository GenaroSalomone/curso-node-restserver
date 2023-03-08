
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

//Instancia de Server para legibilizar mi app.js
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        //Conneccion a Mongo DB
        this.conectarDB();

        //Middlewares (funciones para añadir funcionalidades al webserver)
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );


        //Directorio publico
        this.app.use( express.static( 'public' ) );

    }

    routes() {

        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usuariosPath, require('../routes/usuarios') ) 

    }

    listen() {

        this.app.listen( this.port , () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;

