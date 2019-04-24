let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Plato = require('./../model/plato').Plato;

router.get('/listar', (req, res, next) => {
    Plato.find((err, platos) => {
        if (err) throw err;
        res.send(platos);
    });
});

router.get('/leer/:id', (req, res, next) => {
    let idPlato = req.params.id;
    Plato.findOne({ _id: idPlato }, (err, plato) => {
        if (err) throw err;
        res.send(plato);
    });
});

router.delete('/eliminar/:id', (req, res, next) => {
    let idPlato = req.params.id;

    Plato.remove({ _id: idPlato }, (err) => {
        if (err) send('0');
    });
    res.send('1');
});

router.post('/registrar', (req, res, next) => {
    let plato = new Plato({
        nombre: req.body.nombre,
        urlImagen: req.body.urlImagen,
        precio: req.body.precio
    });

    plato.save((err) => {
        if (err) send('0');
    });
    res.send('1');
});

router.put('/actualizar', (req, res, next) => {
    Plato.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
        if (err) send('0');
    });
    res.send('1');
});

/*
{
	"_id" : "5a1c9d5cfd741b00984df8a1",
	"nombre" : "Jugo de Naranjas",
	"urlImagen" : "http://wwws",
	"precio" : 123
}
*/

module.exports = router;