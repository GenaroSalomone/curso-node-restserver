
const express = require('express');
const cors = require('cors');

//Instancia de Server para legibilizar mi app.js
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares (funciones para añadir funcionalidades al webserver)
        this.middlewares();

        //Rutas de mi app
        this.routes();
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

        this.app.use( this.usuariosPath, require('../routes/usuarios') ) 
    }

    listen() {

        this.app.listen( this.port , () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;

