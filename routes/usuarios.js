
const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
const { validarCampos,
        validarJWT,
        esAdminRol,
        tieneRol } = require('../middlewares');

const { esRoleValido,
        emailExiste,
        existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete,
        } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet );

//validacion en segundo parametro usando middleware de express validator
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength( { min: 6} ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //verificacion personalizada con custom
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.put('/:id',[
    //check('id', 'No es un id valido').isMongoId(),
    //el check de isMongoId se hace en la proxima check custom.
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
] , usuariosPut );

router.patch('/', usuariosPatch);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    tieneRol('VENTAS_ROLE','ADMIN_ROLE'),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] , usuariosDelete);











module.exports = router;
