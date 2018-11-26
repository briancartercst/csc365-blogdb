'use strict'

// grab the packages we need
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// init db
const database = require('./dbMap');
let db = database.init('[["1","This is blog 1"],["2","This is blog 2"],["3","This is blog 3"]]');

// add middleware we need
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// API is never cached by the browser by setting response headers
app.use((req, res, next) => {
    res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    res.setHeader('expires', '0');
    res.setHeader('pragma', 'no-cache');
    next();
});

// set properties -- set to 0 for prod
app.set('json spaces', 2); // number of spaces for indentation

// http://localhost:8080
app.get('/', (req, res) => res.send('API for data store'));

// http://localhost:8080/health
app.get('/health', (req, res) => {
    res.send({health: 'OK'});
});

// http://localhost:8080/api
app.get('/api', (req, res) => {
    res.send(database.mapToObj(db));
});

// http://localhost:8080/api/key
app.get('/api/:key', (req, res) => {
    let result = database.read(db,req.params.key);
    if(result.size == 0) { res.sendStatus(404); return }

    res.send(database.mapToObj(result));
});

// POST http://localhost:8080/api/
app.post('/api', (req, res) => {
    let result = database.read(db,req.body[0]);
    if(result.size !== 0) { res.sendStatus(409); return }

    db = database.create(db, req.body[0], req.body[1]);
    res.send(database.mapToObj(database.read(db, req.body[0])));
});

// PUT http://localhost:8080/api/
app.put('/api', (req, res) => {
    let result = database.read(db,req.body[0]);
    if(result.size == 0) { res.sendStatus(404); return }

    db = database.update(db, req.body[0], req.body[1]);
    res.send(database.mapToObj(database.read(db, req.body[0])));
});


// DELETE http://localhost:8080/api/key
app.delete('/api/:key', (req, res) => {
    let result = database.read(db,req.params.key);
    if(result.size == 0) { res.sendStatus(404); return }

    db = database.del(db, req.params.key);
    res.send(database.mapToObj(database.read(db, req.body.key)));
});

// start the server
app.listen(port);
console.log(`Server started! At http://localhost:${port}`);