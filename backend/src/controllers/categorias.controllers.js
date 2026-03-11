import * as categoriaModelo from '../models/categorias.models.js'

export const getAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModelo.getAllCategorias()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}