const express = require('express');
require('dotenv').config();
const {dbConection} = require('./config/database')
const cors = require('cors');
const { application } = require('express');

const app = express();

app.use(cors());

app.use(express.json());

//Conectandome a la BD AranaDB
dbConection();

//RUTAS DE LA API
app.use('/api/usuarios', require('./routes/usuarios.routes.js'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/estudiantes',require('./routes/estudiantes.routes'));
app.use('/api/docentes',require('./routes/docentes.routes'));
app.use('/api/notas',require('./routes/notas.routes'));
app.use('/api/carnets',require('./routes/carnets.routes'));
app.use('/api/matriculas',require('./routes/matriculas.routes'));
app.use('/api/cursos',require('./routes/cursos.routes'));


app.listen(process.env.PORT, ()=>
{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})