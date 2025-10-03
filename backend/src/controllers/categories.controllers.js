const db = require('../database.js')

exports.get = async(req, res) => {
    try {
        const SQL = 'SELECT * FROM category'
        
        const [result] = await db.query(SQL);

        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({msg: 'Não foi possível obter as categorias do banco de dados'});
    }
}