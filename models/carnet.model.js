const {Schema, model} = require('mongoose');


const CarnetSchema = Schema({
    id_carnet:{
        type: String,
        required: true
    },
    fecha_emision:{
        type: String,
        required: true
    },
    fecha_caducidad:{
        type: String,
        required: true
    }
});

CarnetSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Carnet', CarnetSchema);
