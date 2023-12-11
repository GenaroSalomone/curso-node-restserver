const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
  'usuarios',
  'categorias',
  'productos',
  'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  try {
    let results;

    if (esMongoId) {
      const usuario = await Usuario.findById(termino);
      results = usuario ? [usuario] : [];
    } else {
      const regex = new RegExp(termino, 'i');
      const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
      });
      results = usuarios;
    }

    res.json({
      results
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al buscar el usuario',
    });
  }
};

const buscarCategorias = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  try {
    let results;

    if (esMongoId) {
      const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');;
      results = categoria ? [categoria] : [];
    } else {
      const regex = new RegExp(termino, 'i');
      const categorias = await Categoria.find({
        nombre: regex,
        estado: true
      }).populate('usuario', 'nombre');
      results = categorias;
    }

    res.json({
      results
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al buscar la categoría',
    });
  }
};

const buscarProductos = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  try {
    let results;

    if (esMongoId) {
      const producto = await Producto.findById(termino)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
      results = producto ? [producto] : [];
    } else {
      const regex = new RegExp(termino, 'i');
      const productos = await Producto.find({
        nombre: regex,
        estado: true,
      })
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre');
      results = productos;
    }

    res.json({
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error al buscar los productos',
    });
  }
};



const buscar = ( req, res = response ) => {

  const { coleccion, termino } = req.params;

  if ( !coleccionesPermitidas.includes ( coleccion ) ) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
    })
  }

  switch( coleccion ) {
    case 'usuarios':
      buscarUsuarios( termino, res );
      break;
    case 'categorias':
      buscarCategorias( termino, res );
      break;
    case 'productos':
      buscarProductos( termino, res );
      break;
    default: 
      res.status(500).json({
        msg: 'Se le olvido hacer esta busqueda'
      })
  }

}

module.exports = {
  buscar
}