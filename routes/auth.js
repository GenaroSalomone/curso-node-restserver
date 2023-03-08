const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/login',[
    validarJWT,
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password no puede ser vacio').not().isEmpty(),
    validarCampos
] , login);

module.exports = router;