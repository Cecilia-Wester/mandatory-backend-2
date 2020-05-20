const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8090;
const {getClient, getDB, createObjectId} = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

const db=getDB();
const fetchCard = db.collection('Lists').find().toArray()
.then(res => {
    console.log(res)
})

app.get('/lists', (req, res) => {
    const db = getDB();
    let data = res.data;
    db.collection('Lists')
    .find()
    .toArray()
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(err => {
        res.status(500).end();
    });
});

app.post('/lists', (req, res) => {
    const db = getDB();
    let data = res.data;
    db.collection('Lists')
    .find()
    .toArray()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).end();
    });
});

app.get('/cards', (req,res) => {
    const db=getDB()
    let data = res.data;
    
    db.collection('Cards')
        .find()
        .toArray()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).end()
        });
})

app.post('/cards', (req, res) => {
    const db = getDB();
    let data = req.body;
    db.collection('Cards')
    .insertOne(data)
    .then(result => {
        data._id = result.insertedId
        res.status(201).send(data)
    })
    .catch(e => {
        console.log(e);
        res.status(400).send();
    });
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});