const express = require('express');
const app = express();
const PORT = process.env.PORT || 8090;
const {getClient, getDB, createObjectId} = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});