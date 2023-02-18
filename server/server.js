//backend 
/* eslint-disable no-undef */
'use strict'
// var bodyParser = require('body-parser');
const express = require('express')
var sqlite3 = require('sqlite3');
const server = express();
const jsonParser = express.json();

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));


// server.use(express.static(fullPath)) // ))__dirname + '/public'))
server.use(express.static(__dirname))
const compression = require('compression')


// const db = require('../auto.db');
const db = new sqlite3.Database('../auto.db');


server.on("startup", function() {
    console.log('About to exit.');
    db.commit();

});

server.on('exit', function() {
    console.log('About to exit.');
    db.commit();

});
server.use(compression())
server.listen(8888, function() {
    console.log('Сервер ожидает подключения.on port 8888..' + new Date())
})