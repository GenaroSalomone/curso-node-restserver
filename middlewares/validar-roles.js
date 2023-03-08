
const { response } = require('express');

const esAdminRol = (req, res = response, next ) => { 

    if ( !req.usuario ) {
        //Error de server (backend)
        return res.status(500).json( {
            msg: 'se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto `
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if ( !req.usuario ) {
            //Error de server (backend)
            return res.status(500).json( {
                msg: 'se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${ roles }`
            });
        }

        console.log( roles, req.usuario.rol );
        next();
    }
}






module.exports = { 
    esAdminRol,
    tieneRol
}