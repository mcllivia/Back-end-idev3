const express = require("express");

const app = express();

const port = 3000;

app.get('/',(req, res) => {
    res.send ('Página principal');

}) ;


app.get('/home',(req, res) => {
    res.send ('Página home');

}) ;

app.get('/login',(req, res) => {
    res.send ('Página login');

}) ;





app.listen(port,() => {
    console.log('Servidor rodando na porta',port);
});