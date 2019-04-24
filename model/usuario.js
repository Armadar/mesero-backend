let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    id: { type: String },
    nombre_usuario: { type: String },
    contrasena: { type: String }    
}, { versionKey: false });

let Usuario = mongoose.model('usuarios', usuarioSchema);

module.exports = {
    Usuario,
    usuarioSchema
}    