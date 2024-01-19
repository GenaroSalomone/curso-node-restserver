
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorId, existeCategoriaPorNombre } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias -> publico
router.get('/', obtenerCategorias)

// Obtener una categoria por id -> publico (hacer middleware para validar id)
router.get('/:id', [ 
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
], obtenerCategoria );

// Crear categoria -> privado (cualquier rol)
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeCategoriaPorNombre), 
  validarCampos
], crearCategoria )

// Actualizar -> privado (cualquier rol)
router.put('/:id', [ 
  validarJWT,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeCategoriaPorNombre), 
  validarCampos,
], actualizarCategoria);

// Borrar categoria -> admin
router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria)

module.exports = router;
