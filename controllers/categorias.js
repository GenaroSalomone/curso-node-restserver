
const { response } = require('express');
const { Categoria } = require('../models');


//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const elementosPorPagina = parseInt(req.query.limite) || 5;

  try {
    const categorias = await Categoria.find({ estado: true }) 
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina)
      .populate({
        path: 'usuario',
        select: 'nombre', 
      })
      .exec();

    const totalCategorias = await Categoria.countDocuments({ estado: true }); 

    res.json({
      categorias,
      elementosPorPagina,
      totalCategorias,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al obtener las categorías' });
  }
};


//Obtener categoria - populate {}
const obtenerCategoria = async ( req, res=response ) => {

  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.json( categoria );

}


const crearCategoria = async (req, res = response) => {

  const nombre = req.body.nombre.toUpperCase();

  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = await new Categoria( data );

  //Guardar en db
  await categoria.save();
  res.status(201).json( categoria );

}

//Actualizar categoria (permitir cambiar nombre por otro que no exista)
const actualizarCategoria = async (req, res) => {

  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id; //Usuario dueño del token

  const categoriaActualizada = await Categoria.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  res.json( categoriaActualizada );

};

//Borrar categoria (estado: false) (verificar id)
const borrarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado:false }, { new: true});
  
  res.json(categoriaBorrada)

}
module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}
