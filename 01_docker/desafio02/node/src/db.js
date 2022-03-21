const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'fullcycle'
};

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(config);
    console.log("Conectou ao MySQL!");
    global.connection = connection;
    return connection;
}

async function selectPeoples(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM people;');
    return rows;
}

async function insertPeople(customer){
    const conn = await connect();
    const sql = 'INSERT INTO people( nome ) VALUES ( ? );';
    const values = [customer.nome];
    return await conn.query(sql, values);
}

async function startup(){    
    const sql_create = `CREATE TABLE IF NOT EXISTS people(  id int auto_increment primary key, nome varchar(200) ) engine=innodb;`
    const conn = await connect();
    await conn.query(sql_create);
}

module.exports = {startup, insertPeople, selectPeoples}