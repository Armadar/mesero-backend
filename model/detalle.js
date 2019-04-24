let platoSchema = require('./plato').platoSchema;
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let detalleSchema = new Schema({    
    id: { type: String },
    plato: { type: platoSchema },
    cantidad: { type: Number, min: 0 },
}, { versionKey: false });

let Detalle = mongoose.model('Detalles', detalleSchema);

module.exports = {
    Detalle,
    detalleSchema
};