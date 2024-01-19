

const { response } = require('express');
const { Producto } = require('../models');


const crearProducto = async (req, res = response) => {

  const { estado, usuario, ...body } = req.body;

  const nombre = req.body.nombre.toUpperCase();
  const { descripcion, categoria } = req.body;

  const precioProducto = req.precio !== undefined ? req.precio : 0;

  const data = {
    nombre,
    categoria,
    usuario: req.usuario._id,
    precio: precioProducto,
    descripcion
  }

  const producto = await new Producto( data );

  //Guardar en db
  await producto.save();
  res.status(201).json( producto );

}

const obtenerProductos = async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const elementosPorPagina = parseInt(req.query.limite) || 5;

  const productos = await Producto.find({ estado: true }) 
    .skip((pagina - 1) * elementosPorPagina)
    .limit(elementosPorPagina)
    .populate({
      path: 'usuario',
      select: 'nombre', 
    })
    .populate({
      path: 'categoria',
      select: 'nombre', 
    })
    .exec();

  const totalProductos = await Producto.countDocuments({ estado: true }); 

  res.json({
    productos,
    elementosPorPagina,
    totalProductos,
  });
};

const obtenerProducto = async ( req, res=response ) => {

  const { id } = req.params;
  const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

  res.json( producto );

}

const actualizarProducto = async (req, res) => {

  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if ( data.nombre ) {
    data.nombre = data.nombre.toUpperCase()
  }
  data.usuario = req.usuario._id; 

  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  res.json( productoActualizado );

};

//Borrar producto (estado: false) (verificar id)
const borrarProducto = async (req, res) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate( id, { estado:false }, { new: true});
  res.json(productoBorrado)
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}