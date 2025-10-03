const db = require('../database.js')

exports.add = async(req, res) => {
    const SQL_PRODUCT = "INSERT INTO product (name, description, quantity, price) VALUES (?, ?, ?, ?)";
    const SQL_PRODUCT_CATEGORY = "INSERT INTO product_category (product_id, category_id) VALUES (?, ?)";

    const {name, description, quantity, price, categories} = req.body;

    try {
        const [result] = await db.query(SQL_PRODUCT, [name, description, quantity, price]);

        const productID = result.insertId;

        for(let i = 0; i < categories.length; i++) {
            if(categories[i]) {
                await db.query(SQL_PRODUCT_CATEGORY, [productID, i + 1])
            }
        }

        return res.status(200).json({msg: 'Produto adicionado com sucesso'}); 
    }
    catch (error) {
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
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', c.id,
            'name', c.name
        )
    ) AS categories
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
    catch (error) {
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
    catch (error) {
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
    catch (error) {
        return res.status(400).json({msg: 'Não foi possível deletar o produto do banco de dados'});
    }
}