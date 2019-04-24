let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let platoSchema = new Schema({
    id: { type: String },
    nombre: { type: String },
    urlImagen: { type: String },
    precio: { type: Number, min: 0 }
}, { versionKey: false });

let Plato = mongoose.model('platos', platoSchema);

module.exports = {
    Plato,
    platoSchema
}    