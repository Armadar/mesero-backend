let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Usuario = require('./../model/usuario').Usuario;

router.post('/login', (req, res, next) => {    
    
    let nombre_usuario = req.body.nombre_usuario;
    let contrasena = req.body.contrasena;

    Usuario.findOne({ "nombre_usuario": nombre_usuario, "contrasena" : contrasena }, (err, usuario) => {
        if (err) send('0');
        
        let rpta = usuario != null && usuario.nombre_usuario.length > 0 ? '1' : '0';
        res.send(rpta);
    }); 
});

module.exports = router;