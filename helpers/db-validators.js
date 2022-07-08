
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const mongoose = require('mongoose');

const esRoleValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne ( {rol} );
    if ( !existeRol ) {
        throw new Error (`El rol ${ rol } no está registrado en la BD`)
    }
}

const emailExiste = async ( correo = '') => {

    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error (`El correo ${ correo } ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    
    if ( !mongoose.Types.ObjectId.isValid( id ) ) {
        throw new Error(`No es un ID de Mongoose valido`);
    }
    
    const existeUsuario = await Usuario.findById(id);
 
    if ( !existeUsuario ) {
        throw new Error(`El usuario con el ID '${ id }' no existe`);
    }
};


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}



