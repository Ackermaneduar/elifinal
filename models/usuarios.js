const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROL']
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

// Middleware para encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function(next) {
    const usuario = this;

    // Solo encriptar la contraseña si se ha modificado o es nueva
    if (!usuario.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        usuario.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = model('Usuario', UsuarioSchema);