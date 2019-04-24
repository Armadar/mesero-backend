let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Consumo = require('./../model/consumo');

router.get('/listar', (req, res, next) => {
    Consumo.find((err, consumos) => {
        if (err) throw err;
        res.send(consumos);
    });
});

router.get('/listar/:tipoRango/:fecha1/:fecha2', (req, res, next) => {
    let tipoRango = req.params.tipoRango;
    let fecha1 = req.params.fecha1;
    let fecha2 = req.params.fecha2;

    //console.log(fecha1);
    //console.log(fecha2);
    
    if(tipoRango === 'U'){
        Consumo.find(
            {'fechaPedido' : { $gte : new Date(fecha1), $lt : new Date(fecha2)}}
            , (err, consumos) => {
            if (err) throw err;
            res.send(consumos);
        });
    }else if (tipoRango === 'M'){
        Consumo.find(
            {'fechaPedido' : { $gte : new Date(fecha1), $lte : new Date(fecha2)}}
            , (err, consumos) => {
            if (err) throw err;
            res.send(consumos);
        });
    }    
});

router.get('/leer/:id', (req, res, next) => {
    let idConsumo = req.params.id;
    Consumo.findOne({ _id: idConsumo }, (err, consumo) => {
        if (err) throw err;
        res.send(consumo);
    });
});

router.delete('/eliminar/:id', (req, res, next) => {
    let idConsumo = req.params.id;

    Consumo.remove({ _id: idConsumo }, (err) => {
        if (err) send('0');
    });
    res.send('1');
});

router.post('/registrar', (req, res, next) => {       
    let consumo = new Consumo({
        cliente: req.body.cliente,
        fechaPedido: req.body.fechaPedido,
        total: req.body.total,
        detalle: req.body.detalle
    });

    consumo.save((err) => {
        if (err) res.send('0');
    });
    res.send('1');
});

router.post('/actualizar', (req, res, next) => {
    Consumo.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
        if (err) res.send('0');
    });
    res.send('1');
});

/*
{
	"_id" : "5a1ce9a619d87201dc4d49ce",
    "cliente" : {
        "_id" : "5a1ccb770bc30dd3cb5622d0"
    },
    "fechaPedido" : "8/11/2017",
    "total" : 951.52,
    "detalle" : [
	    	{
	    		"plato"	: {
	    			"_id" : "5a1c90190bc30dd3cb56168e"
	    		},
	    		"cantidad" : 2
	    	},
	    	{
	    		"plato"	: {
	    			"_id" : "5a1c9d5cfd741b00984df8a1"
	    		},
	    		"cantidad" : 2
	    	},
	    	{
	    		"plato"	: {
	    			"_id": "5a1c90190bc30dd3cb56168e"
	    		},
	    		"cantidad" : 1
	    	}
    	]
}
*/

module.exports = router;