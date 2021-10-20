const {Schema, model, Mongoose} = require('mongoose');


const NotaSchema = Schema({
    nota1:{
        type: Number,
        required: true
    },
    nota2:{
        type: Number,
        required: true
    },
    nota3:{
        type: Number,
        required: true
    },
    promedio:{
        type: Number,
        required: true
    },
});

NotaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Nota', NotaSchema);
