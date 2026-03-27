const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema({
    nombre:    { type: String,  required: true },
    precio:    { type: Number,  required: true, min: 0 },
    stock:     { type: Number,  default: 0 },
    categoria: { type: String }
}, { timestamps: true });

const Plato = mongoose.model('Plato', platoSchema);

module.exports = Plato;
