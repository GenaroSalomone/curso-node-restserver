
const { validationResult } = require('express-validator');

//Middlewares -> funciones que se utilizan con el .use 


const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty () ){
        return res.status(400).json( errors );
    }

    //tercer parametro -> avisa que si llegó a este punto siga al siguiente middleware o controlador
    next();
}

module.exports = {
    validarCampos
}












