//backend 
/* eslint-disable no-undef */
'use strict'
// var bodyParser = require('body-parser');
const express = require('express')
var sqlite3 = require('sqlite3').verbose();
const server = express();
const jsonParser = express.json();
const compression = require('compression')
var https = require('https')
var http = require('http')
server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));
server.use(compression());

// server.use(express.static(fullPath)) // ))__dirname + '/public'))
server.use(express.static(__dirname))


// const db = require('../auto.db');
const db = new sqlite3.Database('../auto.db');
let service80 = http.createServer(server).listen(80, function() {
    console.log('Сервер ожидает подключения.on port 80..' + new Date())
});

let service443 = https.createServer(server).listen(443, function() {
        console.log('Сервер ожидает подключения.on port 443..' + new Date())
    })
    // server.listen = function() {
    //     var server = http.createServer(this)
    //     return server.listen.apply(server, arguments)
    // }
service80.on("startup", function() {
    console.log('About  port 80 to startup.');
    // db.commit();

});
//Start Authentication when server starts
server.on('mount', () => {
    console.log('Running Authentication...')
        // auth.main()
});

service80.on('close', function() {
    console.log('About to close process');
});

server.on("SIGINT", function() {
    util.puts("You Pressed CTRL+C");
    somethingAsync(function(err) {
        process.exit();
    });
});

process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('About to close process');
        // debug('HTTP server closed')
    })
})

process.on('exit', () => {
    // Perform some teardown, for example with Knex.js: knex.destroy()
    console.log('Running close...')
});



server.on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(function() {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);

    } else {
        console.log('код ошибки серера' + e.code);
    }
});
server.get('/', async function(req, res) {
    console.time('getrequest1')
    res.send('HI!')
    console.timeEnd('getrequest1')
});




// server.listen(8888, function() {
//     console.log('Сервер ожидает подключения.on port 8888..' + new Date())
// })