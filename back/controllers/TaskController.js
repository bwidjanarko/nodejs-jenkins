import Task from "../models/TaskModel.js";
import jsonwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createClient } from 'redis';

dotenv.config();
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err))
await client.connect();
let secret = process.env.JWT_SECRET_KEY || "1234";
let expiration = process.env.TOKEN_EXPIRATION || 300;

export const generateToken = (secret, username, password) => {
   const token = jsonwt.sign({ username, password }, secret, { expiresIn: expiration });
   return token;
}

export const verifyToken = (secret, token) => {
   const verified = jsonwt.verify(token, secret);
   return verified;
}

export const getTasksWithAuth = async (req, res) => {
    console.log("Get Task Request : "+req.toString());
    const bearer = req.header('Authorization');
    const myArray = bearer.split(" ");
    const token = myArray[1];
    console.log("Token : "+token);
    const verified = verifyToken(secret, token);
    console.log("Verification : "+verified);
    if (verified) {
       console.log("Successfully Verified");
       try {
           const tasks = await Task.find();
           res.status(200).json(tasks);
       } catch (error) {
           res.status(500).json({message: error.message});
       }
    } else {
       console.log("Request Denied");
       res.status(501).json({token: null});
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getTasksWithRedis = async (req, res) => {
   const key = req.path;
   console.log("Key : "+key);
   try {
     let data =  await client.get(key);
     if (data) {
        res.status(200).json(JSON.parse(data));
     } else {
        console.log("Get data from mongodb");
        const tasks = await Task.find();
        await client.set(key, JSON.stringify(tasks), { EX: 60 });
        res.status(200).json(tasks);
     }
   } catch (error) {
     res.status(400).json({message: error.message});
   }
}

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        const insertedtask = await task.save();
        res.status(201).json(insertedtask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateTask = async (req, res) => {
    try {
        const updatedtask = await Task.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedtask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deletedtask = await Task.deleteOne({_id:req.params.id});
        res.status(200).json(deletedtask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
