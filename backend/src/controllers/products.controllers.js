const db = require('../database.js')

exports.get = async(req, res) => {
    const SQL = 'SELECT * FROM product';

    try {
        const [result] = await db.query(SQL);

        return res.status(200).json(result);
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível obter os produtos do banco de dados'});
    }

    //res.json({ message: "Teste rota GET" }); 
}