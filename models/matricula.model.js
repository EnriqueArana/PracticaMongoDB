const {Schema, model} = require('mongoose');

const MatriculaSchema = Schema({
    id_matricula:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        default: 'Ordinaria'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estudiante:{
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    docente:{
        type: Schema.Types.ObjectId,
        ref: 'Docente',
        //required: true
    },
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
});

MatriculaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Matricula', MatriculaSchema);


