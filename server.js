
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
    const db = client.db('vermerien-qc');
    app.get('/', (req, res) => {
        res.render('index.ejs');
    });
    app.get('/search', async (req, res) => {
        let data = await db.collection('products').find({}).toArray();
        let dane = {};
        dane.p = data;
        res.render('search.ejs', dane);
    });
    
    app.get('/product/:productId', async (req, res) => {
        let id = req.params.productId;
        let data = await db.collection('products').findOne({productId: id});
        let dane = {}
        dane.p = data;
        res.render('product.ejs', dane);
    });
}

app.listen(8080, () => {
    console.log('Server is running');
});

run().catch(console.dir);

module.exports = app;