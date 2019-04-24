let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mesero', { useMongoClient: true });

module.exports = mongoose;