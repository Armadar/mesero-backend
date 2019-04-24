let clienteSchema = require('./cliente').clienteSchema;
let detalleSchema = require('./detalle').detalleSchema;
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let consumoSchema = new Schema({
    id: { type: String },
    cliente: { type: clienteSchema },
    fechaPedido: { type: Date },
    total: { type: Number, min: 0 },
    detalle: [detalleSchema]
}, { versionKey: false });

let Consumo = mongoose.model('Consumos', consumoSchema);

module.exports = Consumo;