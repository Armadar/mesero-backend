const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const plato = require('./api/plato.service');
const cliente = require('./api/cliente.service');
const consumo = require('./api/consumo.service');
const usuario = require('./api/usuario.service');
const tienda = require('./api/tienda.service');
const cors = require('cors');
let Usuario = require('./model/usuario').Usuario;

const app = express();
const secretKey = '!_Z3KR3T_!';
app.use(cors());

//Primero los middlewares de bodyParser, luego los de service
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {

    let nombre_usuario = req.body.nombre_usuario;
    let contrasena = req.body.contrasena;

    Usuario.findOne({ "nombre_usuario": nombre_usuario, "contrasena": contrasena }, (err, usuario) => {
        if (err) res.send('0');

        let rpta = 1000;//usuario != null && usuario.nombre_usuario.length > 0 ? 1 : 0;
        if (rpta > 0) {
            const user = { usuario }

            jwt.sign({ user }, 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING', { expiresIn: '59s' }, (err, token) => {
                res.json({
                    token
                });
            });
        } else {
            res.send('0');
        }
    });
});

app.use((req, res, next) => { // funcion que se utiliza en todas las llamadas/peticiones
    verificarToken(req, res, next);// Interceptador
    /*
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
    */
});

app.use('/plato', plato); // todos los prefijos que tenga plato, lo va a manejar plato, so plato.Service
app.use('/cliente', cliente);
app.use('/consumo', consumo);
app.use('/usuario', usuario);
app.use('/tienda', tienda);

function verificarToken(req, res, next) {
    const header = req.headers['authorization']; 
    if (typeof header != 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;

        jwt.verify(req.token, 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    }
    else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});