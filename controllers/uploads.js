const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe usuario con el ID: ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe producto con el ID: ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }
  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();
  res.json(modelo);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
