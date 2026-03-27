// services/auth.service.js
const AuthUser = require('../models/auth.model');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');

class AuthService {
    async register(data) {
        const { email, password } = data;
        const saltRounds   = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const usuario = new AuthUser({ email, password: hashedPassword });
        return await usuario.save();
    }
    
    async login(data) {
        const { email, password } = data;
        const usuario = await AuthUser.findOne({ email });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            throw new Error('Contraseña incorrecta');
        }
        
        const payload = { email: usuario.email };
        return this.generarToken(payload);
    }
    
    async generarToken(payload) {
        const claveSecreta = process.env.JWT_SECRET || 'clave_desarrollo';
        const opciones     = { expiresIn: '24h' };
        return jwt.sign(payload, claveSecreta, opciones);
    }
}
module.exports = new AuthService();
