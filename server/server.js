//backend 
/* eslint-disable no-undef */
'use strict'

const express = require('express')
var sqlite3 = require('sqlite3').verbose();
const server = express();
// const jsonParser = express.json();
const compression = require('compression')
var https = require('https')
var http = require('http')
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use(compression());
let bodytypeArray = [];
let enginetypeArray = [];
let wheeltypeArray = [];
let geartypeArray = [];
let countryArray = [];

// server.use(express.static(fullPath)) // ))__dirname + '/public'))
server.use(express.static(__dirname + '/public'))


// const db = require('./auto.db');
let db = new sqlite3.Database('./auto.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the cars database.');
});

db.all("SELECT bodytype FROM bodytype", function(err, rows) {
    bodytypeArray = rows.map((e) => { return e.bodytype });
});
db.all("SELECT enginetype FROM enginetype", function(err, rows) {
    enginetypeArray = rows.map((e) => { return e.enginetype });
});
db.all("SELECT wheeltype FROM wheeltype", function(err, rows) {
    wheeltypeArray = rows.map((e) => { return e.wheeltype });
});
db.all("SELECT geartype FROM geartype", function(err, rows) {
    geartypeArray = rows.map((e) => { return e.geartype });
});
db.all("SELECT name FROM country", function(err, rows) {
    countryArray = rows.map((e) => { return e.name });
});




http.createServer(server).listen(80, function() {
    console.log('Сервер ожидает подключения.on port 80..  ' + new Date())
});

https.createServer(server).listen(443, function() {
    console.log('Сервер ожидает подключения.on port 443..  ' + new Date())
})
server.listen = function() {
    var server = http.createServer(this)


    return server.listen.apply(server, arguments)
}
process.on('SIGINT', () => {
    console.log('About to close process SIGINT or CTRL+C');
    db.commit();
    db.close();
    server.close();
});


server.on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(function() {
            db.commit();
            db.close();
            server.close();
            server.listen(PORT, HOST);
        }, 1000);

    } else {
        console.log('код ошибки серера' + e.code);
    }
});

const getFromTable = (tableName) => {
    return new Promise((resolve, reject) => {
        cursor = db.
        execute("SELECT * from " + tableName.toString())
        resolve(JSON.parse(cursor))
    })

}
server.get('/', async function(req, res) {
    console.time('getrequest1')


    res.send({
        bodytypes: bodytypeArray,
        enginetypes: enginetypeArray,
        wheeltypes: wheeltypeArray,
        geartypes: geartypeArray,
        countries: countryArray
    })
    console.timeEnd('getrequest1')
});