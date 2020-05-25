const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8090;
const {getClient, getDB, createObjectId} = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

// const db=getDB()
// const fetchCard = db.collection('Lists').find({_id: createObjectId(cardId)}).toArray()
// .then(res => {
//     console.log(res)
// })

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
        res.status(200).send('card deleted', card)
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
        .updateOne({_id: createObjectId(cardId)},{$set:{cardDescription: data.cardDescription, cardTitle: data.cardTitle}})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err);
        })
})
    //console.log('id: ' + cardId + ' data: ' + data)
    
    // let where = {_id: 'ObjectId("' + cardId + '")' }
    // console.log(where)
    // let newValues = {$set:{cardDescription: data.cardDescription, cardTitle: data.cardTitle} }

    // if (data.cardDescription === undefined)
    // {
    //     newValues = {$set:{ cardTitle: data.cardTitle} }
    // }
    // console.log(newValues)

    // const db = getDB();
    // db.collection('Cards')
    // .updateOne(where, newValues, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document updated");
    // });



    // .updateOne(where, newValues, function(err,res))
    // .then(card => {
    //     console.log('card updated');
    //     res.status(200).send();
    // })
    // .catch(err => {
    //     console.log(err);
    // })
//})
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