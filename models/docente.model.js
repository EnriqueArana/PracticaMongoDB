const {Schema, model} = require('mongoose');


const DocenteSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    matricula:{
        type: Schema.Types.ObjectId,
        ref: 'Matricula',
        required: true
    },
});

DocenteSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Docente', DocenteSchema);


