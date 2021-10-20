const {Schema, model} = require('mongoose');


const CursoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    creditos:{
        type: Number,
        required: true
    },
    docente:{
        type: Schema.Types.ObjectId,
        ref: 'Docente',
    },
});

CursoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Curso', CursoSchema);


