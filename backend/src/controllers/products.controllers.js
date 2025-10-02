const db = require('../database.js')

exports.add = async(req, res) => {
    const SQL = "INSERT INTO product (name, description, quantity, price) VALUES (?, ?, ?, ?)";

    const {name, description, quantity, price} = req.body;

    try {
        await db.query(SQL, [name, description, quantity, price]);

        return res.status(200).json({msg: 'Produto adicionado com sucesso'}); 
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível adicionar o produto no banco de dados'});
    }
}

exports.get = async(req, res) => {
    const SQL = `
    SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.quantity, 
        p.price,
        GROUP_CONCAT(c.name SEPARATOR ', ') AS categories
    FROM product AS p
    LEFT JOIN product_category AS pc ON p.id = pc.product_id
    LEFT JOIN category AS c ON pc.category_id = c.id
    GROUP BY p.id, p.name, p.description, p.quantity, p.price
    ORDER BY p.id;
    `;

    try {
        const [result] = await db.query(SQL);

        return res.status(200).json(result);
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível obter os produtos do banco de dados'});
    }
}

exports.update = async(req, res) => {
    const SQL = "UPDATE product SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ?";

    const id = req.params.id;
    const {name, description, quantity, price} = req.body;

    try {
        await db.query(SQL, [name, description, quantity, price, id]);

        return res.status(200).json({msg: 'Produto editado com sucesso'}); 
    }
    catch {
        return res.status(400).json({msg: 'Não foi possível editar o produto no banco de dados'});
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