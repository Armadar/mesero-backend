let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let clienteSchema = new Schema({
    id: { type: String },
    nombreCompleto: { type: String },
    dni: { type: String }    
}, { versionKey: false });

let Cliente = mongoose.model('clientes', clienteSchema);

module.exports = {
    Cliente,
    clienteSchema
}    