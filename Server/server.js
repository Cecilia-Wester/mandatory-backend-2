const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8090;
const {getClient, getDB, createObjectId} = require('./db');

app.use((req, res, next) => {
    if (req.is('json')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });
        req.on('end', () => {
            try {
                data = JSON.parse(data);
                req.body = data;
                next();
            } catch(e) {
                res.status(400).send();
            }
        });
    } else {
        next();
    }
})

app.use((req, res, next) => {
    const startHrTime = Date.now();
    res.once('finish', () => {
        const elapsedHrTime = Date.now();
        const elapsedTimeInMs = (elapsedHrTime - startHrTime);
        console.log( req.method, req.path, res.statusCode, elapsedTimeInMs + ' ms' )
    })
    next();
});

app.get('/lists', (req, res) => {
    const db = getDB();
    db.collection('Lists')
    .find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(204).end('there are no existing lists')
            return;
        }
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).end(err);
    });
});

app.get('/cards', (req,res) => {
    const db=getDB();
    db.collection('Cards')
    .find()
    .toArray()
    .then(data => {
        if(!data.length){
            res.status(204).end()
            return;
        }
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).end(err)
    });
})

app.post('/lists', (req, res) => {
    const db = getDB();
    let data = req.body;
    if(!data){
        res.status(400).end();
        return;
    }
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

app.post('/cards', (req, res) => {
    const db = getDB();
    let data = req.body;
    console.log(data)
    if(!data){
        res.status(400).end();
        return;
    }
    db.collection('Cards')
    .insertOne(data)
    .then(result => {
        data._id = result.insertedId
        res.status(201).send(data)
    })
    .catch(e => {
        console.log(e);
        res.status(500).end();
    });
})

app.patch('/cards/:id', (req, res) => {
    let cardId = req.params.id;
    let data = req.body;
    const db = getDB();
    if(!data){
        res.status(400).end();
        return;
    }
    db.collection('Cards')
    .updateOne({_id: createObjectId(cardId)},{$set:{cardDescription: data.cardDescription, cardTitle: data.cardTitle, listId: data.listId}})
    .then(result => {
        res.status(202).send('card updated');
    })
    .catch(err => {
        console.log(err)
        res.status(500).end('card not updated');
    });
})

app.delete('/lists/:id/', (req, res) => {
    let listId = req.params.id;
    const db = getDB()
    db.collection('Lists')
    .removeOne({_id: createObjectId(listId)})
    .then(result => {
        res.status(204).end()
    })
    .catch(err => {
        res.status(500).end()
    });
    db.collection('Cards')
    .deleteMany({listId: listId})
    .then(result => {
        res.status(204).end()
    })
    .catch(err =>{  
        res.status(500).end()
    })
})


// app.delete('/lists/:id/', (req, res) => {
//     let listId = req.params.id;
    
//     const db = getDB()
    
//     db.collection('Lists')
//     .removeOne({_id: createObjectId(listId)})
//     .then(result => {
//         res.status(204).end()
//     })
//     .catch(err => {
//         res.status(500).end()
//     });
    // db.collection('Cards')
    // .deleteMany({cards: cards})
    // .then(result => {
    //     res.status(204).end()
    // })
    // .catch(err =>{  
    //     res.status(500).end()

    // })
//})

app.delete('/cards/:id', (req, res) => {
    let cardId = req.params.id;
    const db = getDB();
    db.collection('Cards')
    .removeOne({_id: createObjectId(cardId)})
    .then(card => {
        res.status(204).send('card deleted')
    })
    .catch(err => {
        res.status(500).end(err)
    });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

