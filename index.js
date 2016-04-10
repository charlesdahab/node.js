"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let server = require('http').Server(app);

const MongoClient = require('mongodb').MongoClient;


app.use('/', express.static(__dirname + '/static'));

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

function count(cb){
    let i=0;
    while (i<10000000000) {
        i = i+1
    }
    cb('Hello World '+i);
}

function ad_hoc(req, res) {
    count(res.status(200).send);
}



app.get('/hello', ad_hoc);

app.get('/hello2', (req,res)=>{
    getInfo()
    .then(x=>console.log(x))
    .catch((x) => {console.log(x);});
    // res.status(200).send("response is "+i);
})

function getInfo() {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://127.0.0.1/charlesdb', (err, db)=>{
            if(!err){
                resolve( 20);
            } else{
                reject(err);
            }
        });
    })

}

server.listen(5000);
