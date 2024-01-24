
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');
const mongoose = require('mongoose');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No es un ID de Mongoose valido`);
    }

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El usuario con el ID '${id}' no existe`);
    }
};

const existeCategoriaPorId = async (id) => {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
        throw new Error(`La categoria con el ID '${id}' no existe`);
    }
}

const existeProductoPorId = async (id) => {
    const producto = await Producto.findById(id);

    if (!producto) {
        throw new Error(`El producto con el ID '${id}' no existe`);
    }
}

const existeCategoriaPorNombre = async (nombre) => {
    nombre = nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        throw new Error(`La categoria ${nombre}, ya existe`);
    }
}

const existeProductoPorNombre = async (nombre) => {
    nombre = nombre.toUpperCase();
    const productoExistente = await Producto.findOne({ nombre });

    if (productoExistente) {
        throw new Error('El nombre de el producto ya está en uso');
    }
};

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) throw new Error(`La coleccion ${coleccion} no esta permitida`);
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeCategoriaPorNombre,
    existeProductoPorNombre,
    existeProductoPorId,
    coleccionesPermitidas
}



