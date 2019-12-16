const express = require('express');
const Blockchain = require('../Blockchain');
const bodyParser = require('body-parser');

const app = express();
const bc = new Blockchain();
const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(bodyParser.json());

app.get('/blocks', (req,res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block has been added ${block.toString()}`);
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Server running at ${HTTP_PORT}`));