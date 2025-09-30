const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if(error) {
        console.log("Ocorreu um erro ao se conectar com o banco de dados");
    }
    else {
        console.log("Conexão com o banco de dados realizada com sucesso");
    }
})

module.exports = db.promise();