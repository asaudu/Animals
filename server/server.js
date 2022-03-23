const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
app.get('/api/species', cors(), async (req, res) => {
    // const STUDENTS = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(STUDENTS);
    try{
        const { rows: species } = await db.query('SELECT * FROM Species');
        res.send(species);
    } catch (e){
        return res.status(400).json({e});
    }
});

//create the POST request
app.post('/api/species', cors(), async (req, res) => {
    const newAnimal = { commonname: req.body.commonname, scientificname: req.body.scientificname }
    console.log("testing info ", [newAnimal.commonname, newAnimal.scientificname]);
    const result = await db.query(
        //a function with 2 parameters, the titles u want to insert into
        'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
        //array of the values defined above
        [newAnimal.firstname, newAnimal.lastname]
    );
    //to get more specific with the display, could utilize result.rowCount and add an if statement after the console.log ie if(result.rowCount > 0)
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});