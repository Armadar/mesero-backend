let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tiendaSchema = new Schema({
    id: { type: String },
    name: { type: String },
    address: { type: String },
    image : { type: String }    
}, { versionKey: false });

let Tienda = mongoose.model('tiendas', tiendaSchema);

module.exports = {
    Tienda,
    tiendaSchema
}    
