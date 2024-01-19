const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async (req, res = response ) => {

    //desestructuro limite que viene de la req
    const { limite = 5, desde = 0} = req.query;
    let cond = {estado: true}
    /*
    const usuarios = await Usuario.find( cond )
        .skip( Number ( desde ) )
        .limit( Number( limite ) );

    const total = await Usuario.countDocuments( cond ); 
    */

    //al haber 2 awaits que no dependen uno del otro el codigo se bloquea, los tiempos se suman
    //se dispararán ahora simultaneamente con Promise.all con desestructuracion:

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( cond ),
        Usuario.find( cond )
        .skip( Number ( desde ) )
        .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res = response) => {
 
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    //encriptar password

    //salt
    const salt = bcryptjs.genSaltSync();

    //hash -> encriptacion a una via
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en DB
    await usuario.save();
    
    res.json({
        usuario
    });
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    //uso del operador rest (...)
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
};

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //Borrado fisico
    //const usuario = await Usuario.findByIdAndDelete( id ); 

    //Borrado no fisico: cambio de la prop. estado (RECOMENDADO)
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    const usuarioAutenticado = req.usuario;
    res.json( usuario );
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}



