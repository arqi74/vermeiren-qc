
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://arwi74:Dw2321@cluster0.mwjgtvs.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    await client.connect();
    const db = client.db('vermeiren-qc');
    app.get('/', (req, res) => {
        res.render('index.ejs');
    });
    app.get('/search', (req, res) => {
        res.render('search.ejs');
    });
}

app.listen(8080, () => {
    console.log('Server is running');
});

run().catch(console.dir);

module.exports = app;