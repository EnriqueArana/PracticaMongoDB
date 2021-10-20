const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    codigo:{
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    matricula:{
        type: Schema.Types.ObjectId,
        ref: 'Matricula',
        //required: true
    },
    nota:{
        type: Schema.Types.ObjectId,
        ref: 'Nota',
        //required: true
    },
    facultad: {
        type: String,
        default: 'Ingenieria'
    },
    escuela: {
        type: String,
        default: 'Sistemas'
    },
});


EstudianteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Estudiante', EstudianteSchema );