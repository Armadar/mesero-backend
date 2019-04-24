let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Tienda = require('./../model/tienda').Tienda;

router.get('/leer/:id', (req, res, next) => {
    let idTienda = req.params.id;
    Tienda.findOne({ _id: idTienda }, (err, tienda) => {
        if (err) throw err;
        res.send(tienda);
    });
});

router.get('/getthefirst/', (req, res, next) => {
    Tienda.findOne((err, tiendas) => {
        if (err) throw err;
        res.send(tiendas);
    }).sort({ order: 1 }).limit(1);
});

router.put('/actualizar', (req, res, next) => {
    console.log(req.body);
    Tienda.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
        if (err) res.send('0');
    });
    res.send('1');
});

module.exports = router;

/*
{
    "_id" : "5a720c079d413298a6ca9145", // <-- solo para actualizar no para leerId
    "nombre" : "MI_TIENDAS",
    "direccion" : "Lima, Perú",
    "fotoUrl" : "https://www.oceanografic.org/wp-content/uploads/2016/01/restaurante_submarino_4-890x500.jpg"
}
*/