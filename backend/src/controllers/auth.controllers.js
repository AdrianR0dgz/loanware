import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuario.model.js';

export const register = async (req, res) => {
    try {
        const { email, password, nombre_completo } = req.body;
        if (!email || !password || !nombre_completo) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const existe = await usuarioModel.findUsuarioByEmail(email);
        if (existe) return res.status(409).json({ message: 'El email ya está registrado' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoId = await usuarioModel.createUsuario(email, passwordHash, nombre_completo);
        res.status(201).json({ message: 'Usuario creado con éxito', id: nuevoId });
    } catch (error) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.findUsuarioByEmail(email);
        if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });

        const esValida = await bcrypt.compare(password, usuario.password_hash);
        if (!esValida) return res.status(401).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, usuario: { id: usuario.id_usuario, nombre: usuario.nombre_completo, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ error: 'Error en el proceso de login' });
    }
};