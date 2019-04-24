let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Cliente = require('./../model/cliente').Cliente;

router.get('/listar', (req, res, next) => {    
    Cliente.find((err, clientes) => {
        if (err) throw err;
        res.send(clientes);
    });
});

router.get('/leer/:id', (req, res, next) => {
    let idCliente = req.params.id;
    Cliente.findOne({ _id: idCliente }, (err, cliente) => {
        if (err) throw err;
        res.send(cliente);
    });
});

router.delete('/eliminar/:id', (req, res, next) => {
    let idCliente = req.params.id;

    Cliente.remove({ _id: idCliente }, (err) => {
        if (err) res.send('0');
    });
    res.send('1');
});

router.post('/registrar', (req, res, next) => {
    let cliente = new Cliente({
        nombreCompleto: req.body.nombreCompleto,
        dni: req.body.dni        
    });

    cliente.save((err, cli) => {
        if (err) res.send('0');    
        res.send(cli._id);
    });    
});

router.post('/actualizar', (req, res, next) => {
    Cliente.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
        if (err) res.send('0');
    });
    res.send('1');
});

/*
{
	"_id" : "5a1ca0a37cb8e400c07ea0bc",
	"nombreCompleto" : "Jaime E. Medina Delgado",
	"dni" : "72301306"
}
*/

module.exports = router;