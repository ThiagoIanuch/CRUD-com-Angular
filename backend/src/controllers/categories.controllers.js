const db = require('../database.js')

exports.add = async(req, res) => {
    const SQL = "INSERT INTO category (name) VALUES (?)";

    const {name} = req.body;

    try {
        await db.query(SQL, name);

        return res.status(200).json({msg: 'Categoria adicionada com sucesso'}); 
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Não foi possível adicionar a categoria no banco de dados'});
    }
}

exports.get = async(req, res) => {
    try {
        const SQL = 'SELECT * FROM category'
        
        const [result] = await db.query(SQL);

        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Não foi possível obter as categorias do banco de dados'});
    }
}

exports.delete = async(req, res) => {
    const SQL = 'DELETE FROM category WHERE id = ?';

    const id = req.params.id;

    try {
        await db.query(SQL, [id]);

        return res.status(200).json({msg: 'Categoria deletada com sucesso'}); 
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({msg: 'Não foi possível deletar a categoria do banco de dados'});
    }
}