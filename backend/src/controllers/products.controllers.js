const db = require('../database.js')

exports.get = async(req, res) => {
    const SQL = 'SELECT * FROM product ORDER BY id';

    try {
        const [result] = await db.query(SQL);

        return res.status(200).json(result);
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível obter os produtos do banco de dados'});
    }
}

exports.delete = async(req, res) => {
    const SQL = 'DELETE FROM product WHERE id = ?';

    const id = req.params.id;

    try {
        await db.query(SQL, [id]);

        return res.status(200).json({msg: 'Produto deletado com sucesso'}); 
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível deletar o produto do banco de dados'});
    }
}