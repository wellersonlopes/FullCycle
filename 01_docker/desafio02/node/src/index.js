const express = require('express') 
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'fullcycle'
};

const mysql = require('mysql')
const sql_create = `CREATE TABLE IF NOT EXISTS people(  id int auto_increment primary key, nome varchar(200) ) engine=innodb;`
const sql_query  = `SELECT nome FROM people;`
const names = ['Ana Paula', 'Joao Pedro', 'Silmara', 'Clara', 'Marcelo', 'Gabriel'];


app.get('/', (req, res) => {
    const index = Math.floor(Math.random() * names.length);
    const nome = names[index];
    const sql_insert = `INSERT INTO people(nome) values('${nome}');`;

    let connection = mysql.createConnection(config)
    try {
        connection.query(sql_insert);
    } catch (error) {
        console.error('Falha ao executar comando...')
    } finally {
        connection.end()
    }

    let response = 
        `<h1>Full Cycle Rocks!</h1>
         <ul>`;

    connection = mysql.createConnection(config)
    try {
        connection.query(sql_query, (err, result, fields) => {
            if(err) throw err;

            for (const index in result) {
                response = `${response}<li>${result[index].nome}</li>`
            }
            res.send(response)
        } );
    } catch (error) {
        console.error('Falha ao executar comando...')
    } finally {
        connection.end()
    }


})

app.listen(port, () => {
    console.log('Escutando na porta ' + port + '...')
    const connection = mysql.createConnection(config)
    try {
        connection.query(sql_create);
    } catch (error) {
        console.error('Falha ao executar comando...')
    } finally {
        connection.end()
    }
    
})
