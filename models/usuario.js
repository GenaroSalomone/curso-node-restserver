
const { Schema, model } = require('mongoose');

const usuarioSchema = Schema( {
    nombre: {
        type: String,
        //primer elem -> si es o no requerido, segundo elem -> envia mensaje de error
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//sobreescribo metodo toJSON
usuarioSchema.methods.toJSON = function () {
    // ... -> almacena el resto de propiedades en usuario
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', usuarioSchema );








