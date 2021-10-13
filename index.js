const express = require('express');
require('dotenv').config();
const {dbConection} = require('./config/database')
const cors = require('cors');

const app = express();

app.use(cors());

//Conectandome a la BD AranaDB
dbConection();

app.get('/',(req,res)=>{
    res.status(400).json({
        ok:true,
        msg: 'Bienvenidos a node'
    });
})


app.listen(process.env.PORT, ()=>
{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})