import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Route from "./routes/Routes.js";
import dotenv from "dotenv";
import { createClient } from 'redis';

dotenv.config();
let MONGO_PORT = process.env.MONGO_PORT || 27017;
let HOST_PORT = process.env.HOST_PORT || 8099;
let MONGO_URL = process.env.MONGO_URL || "mongodb://192.168.56.42:27017/MigSLRevamp?replicaSet=rs0";
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err))
await client.connect();
client.keys('*', (err, keys) => {
  if (err) return console.log(err);
  for(let i = 0; i < keys.length; i++) {
    console.log("redis delete : "+keys[i]);
    client.del(keys[i], function(err, reply) {
        console.log(reply);
    });
  }
});
const app = express();
console.log("MONGO_DB_PORT : "+MONGO_PORT);
console.log("HOST PORT : "+HOST_PORT);
mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, 
      useUnifiedTopology: true 
    },
);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));
app.use(cors());
app.use(express.json());
app.use(Route);
app.listen(HOST_PORT, () => console.log('Server Up and Running on Port ' + HOST_PORT));
