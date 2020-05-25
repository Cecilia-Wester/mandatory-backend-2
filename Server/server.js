const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8090;
const {getClient, getDB, createObjectId} = require('./db');

app.use(express.json());

app.use((req, res, next) => {
    const startHrTime = Date.now();
    res.once('finish', () => {
        const elapsedHrTime = Date.now();
        const elapsedTimeInMs = (elapsedHrTime - startHrTime);
        console.log( req.method, req.path, res.statusCode, elapsedTimeInMs + ' ms' )
    })
    next();
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/lists', (req, res) => {
    const db = getDB();
    let data = req.data;
    db.collection('Lists')
    .find()
    .toArray()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).end();
    });
});

app.post('/lists', (req, res) => {
    const db = getDB();
    let data = req.body;
    db.collection('Lists')
    .insertOne(data)
    .then(result => {
        data._id = result.insertedId;
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(400).end();
    });
});

app.get('/cards', (req,res) => {
    const db=getDB()
    let data = req.data;
    
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
    console.log(data)
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

app.delete('/cards/:id', (req, res) => {
    let cardId = req.params.id;
    const db = getDB();
    db.collection('Cards')
    .removeOne({_id: createObjectId(cardId)})
    .then(card => {
        console.log('card deleted')
        res.status(200).send('card deleted')
    })
    .catch(err => {
        res.status(500).send(err)
    });
});

app.patch('/cards/:id', (req, res) => {
    let cardId = req.params.id;
    let data = req.body;
    const db = getDB();
    console.log(data)
    db.collection('Cards')
    .updateOne({_id: createObjectId(cardId)},{$set:{cardDescription: data.cardDescription, cardTitle: data.cardTitle, listId: data.listId}})
    .then(result => {
        res.status(200).send('card updated');
    })
    .catch(err => {
        console.log(err)
        res.status(500).send();
    });
})

app.delete('/lists/:id', (req, res) => {
    let listId = req.params.id;
    const db = getDB()
    db.collection('Lists')
    .removeOne({_id: createObjectId(listId)})
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(500).send()
    });
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});