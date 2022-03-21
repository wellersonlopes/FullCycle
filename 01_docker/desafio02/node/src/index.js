const express = require('express') 
const app = express()
const port = 3000

const db = require("./db");

const names = ['Ana Paula', 'Joao Pedro', 'Silmara', 'Clara', 'Marcelo', 'Gabriel', 'Bianca', 'Luiza'];

app.get('/', async (req, res) => {
    const index = Math.floor(Math.random() * names.length);
    const nome_pessoa = names[index];

    try {
        await db.insertPeople({nome: nome_pessoa})
    } catch (error) {
        console.error('Falha ao incluir pessoa...', error)
    } 

    let response = 
        `<h1>Full Cycle Rocks!</h1>
         <ul>`;

    try {
        const peoples = await db.selectPeoples();
        peoples.forEach(people => {
            response = `${response}<li>${people.nome}</li>`
        });
        response = `${response}</ul>`
            // for (const index in result) {
            //     response = `${response}<li>${result[index].nome}</li>`
            // }
            
    } catch (error) {
        console.error('Falha ao buscar pessoas...', error)
    }
    res.send(response)
})

app.listen(port, async () => {
    console.log('Escutando na porta ' + port + '...')
    try {
        await db.startup()
    } catch (error) {
        console.error('Falha ao executar comando...', error)
    }
    // const connection = mysql.createConnection(config)
    // try {
    //     connection.query(sql_create);
    // } catch (error) {
    //     console.error('Falha ao executar comando...')
    // } finally {
    //     connection.end()
    // }
    
})
