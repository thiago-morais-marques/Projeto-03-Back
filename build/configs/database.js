"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// Função que faz a conexão com o Banco de Dados
const initDbConnection = () => {
  (0, _mongoose.connect)(process.env.MONGODB_URI).then(() => console.log('Connected to Mongo Database')).catch(err => console.log(err));
};

var _default = initDbConnection;
exports.default = _default;