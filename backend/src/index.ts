import { MongoClient } from "mongodb";
const express = require("express");
const body = require("body-parser");

async function start(){
    try {
        const app = express();
        const mongo = await MongoClient.connect("mongodb+srv://SamiraSiham:6NsFjaaqnmveI1eW@samirasiham.t2yvz.mongodb.net/analyse_panier?retryWrites=true&w=majority&appName=SamiraSiham/analyse_panier");
        await mongo.connect();
        app.db = mongo.db();
        app.use(body.json({limit : '500kb'}));

        app.use('/products', require('./router/products'));
        app.use('/analytics', require('./router/analytics'));

        app.listen(3000, ()=>{
            console.log('listening on port 3000'); 
        })
    } catch (error) {
        console.log(error)
    }
}

start();