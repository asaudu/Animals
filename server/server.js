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
   
    try{
        const { rows: species } = await db.query('SELECT * FROM Species');
        res.send(species);
    } catch (e){
        return res.status(400).json({e});
    }
});

// app.get('/api/individuals', cors(), async (req, res) => {
    
//     try{
//         const { rows: species } = await db.query('SELECT * FROM Individuals');
//         res.send(species);
//     } catch (e){
//         return res.status(400).json({e});
//     }
// });

app.get('/api/sightings', cors(), async (req, res) => {
    
    try{
        const { rows: species } = await db.query('SELECT * FROM Sightings');
        res.send(species);
    } catch (e){
        return res.status(400).json({e});
    }
});

//create the POST request
app.post('/api/species', cors(), async (req, res) => {
    //object which defines what properties you want from the request
    const newAnimal = req.body
    //{ commonname: req.body.commonname, scientificname: req.body.scientificname, numberinthewild: req.body.numberinthewild, conservationstatuscode: req.body.conservationstatuscode, recordcreation: req.body.recordcreation }
    console.log("testing info ", [newAnimal.commonname, newAnimal.scientificname]);
    const result = await db.query(
        //a function with 2 parameters, the titles u want to insert into
        'INSERT INTO species(commonname, scientificname, numberinthewild, conservationstatuscode, recordcreation) VALUES($1, $2, $3, $4, $5) RETURNING *',
        //array of the parameters defined above
        [newAnimal.commonname, newAnimal.scientificname, newAnimal.numberinthewild, newAnimal.conservationstatuscode, newAnimal.recordcreation]
    );
    //to get more specific with the display, could utilize result.rowCount and add an if statement after the console.log ie if(result.rowCount > 0)
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// app.post('/api/individuals', cors(), async (req, res) => {
//     //object which defines what properties you want from the request
//     const newIndividual = req.body
    
//     console.log("testing info ", [newIndividual.nickname, newIndividual.species]);
//     const result = await db.query(
//         //a function with 2 parameters, the titles u want to insert into
//         'INSERT INTO individuals(nickname, species, recordcreation) VALUES($1, $2, $3) RETURNING *',
//         //array of the parameters defined above
//         [newIndividual.nickname, newIndividual.species, newIndividual.recordcreation]
//     );
//     //to get more specific with the display, could utilize result.rowCount and add an if statement after the console.log ie if(result.rowCount > 0)
//     console.log(result.rows[0]);
//     res.json(result.rows[0]);
// });


app.post('/api/sightings', cors(), async (req, res) => {
    //object which defines what properties you want from the request
    const newSighting = req.body
    console.log("testing info ", [newSighting.dateandtimeofsighting, newSighting.individualseen]);

    const result = await db.query(
        //a function with 2 parameters, the titles u want to insert into
        'INSERT INTO sightings(dateandtimeofsighting, individualseen, sightinglocation, healthycondition, emailaddress, recordcreation) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        //array of the parameters defined above
        [newSighting.dateandtimeofsighting, newSighting.individualseen, newSighting.sightinglocation, newSighting.healthycondition, newSighting.emailaddress, newSighting.recordcreation]
    );
    //to get more specific with the display, could utilize result.rowCount and add an if statement after the console.log ie if(result.rowCount > 0)
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});