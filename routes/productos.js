const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorNombre, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Crear producto -> privado (cualquier rol)
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( existeProductoPorNombre ), 
  check('categoria', 'La categoría es obligatoria').not().isEmpty(),
  check('categoria', 'No es un id de Mongo válido').isMongoId(),
  check('categoria').custom(existeCategoriaPorId), 
  check('descripcion', 'La descripción debe ser un string').optional().isString(), 
  validarCampos
], crearProducto )

// Obtener productos
router.get('/', obtenerProductos )

// Obtener un producto por id
router.get('/:id', [ 
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], obtenerProducto );

// Actualizar -> privado (cualquier rol)
router.put('/:id', [ 
  validarJWT,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], actualizarProducto);

// Borrar producto -> admin
router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], borrarProducto)

module.exports = router;