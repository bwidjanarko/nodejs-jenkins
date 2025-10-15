import User from "../models/UserModel.js";
import jsonwt from "jsonwebtoken";
import dotenv from "dotenv";
import query from "express-validator";

dotenv.config();
const secret = "1234";
export const generateToken = (secret, username, password) => {
   const token = jsonwt.sign({ username, password }, secret, { expiresIn: 300 });
   return token; 
}

export const verifyToken = (secret, token) => {
   const verified = jsonwt.verify(token, secret);
   return verified; 
}

export const getUsersWithAuth = async (req, res) => {
    console.log("Get User Request : "+req.toString());
    const bearer = req.header('Authorization');
    const myArray = bearer.split(" ");
    const token = myArray[1];
    console.log("Token : "+token);
    const verified = verifyToken(secret, token);
    console.log("Verification : "+verified);
    if (verified) {
       console.log("Successfully Verified");
       try {
           const users = await User.find();
           res.status(200).json(users);
       } catch (error) {
           res.status(500).json({message: error.message});
       }
    } else {
       console.log("Request Denied");
       res.status(501).json({token: null});
    }
}

export const getUsers = async (req, res) => {
    try {
         const users = await User.find();
         res.status(200).json(users);
    } catch (error) {
         res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    console.log("Delete User");
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Logging In : "+username+" : "+password);
        let user = await User.findOne({ username });
        if (user) {
            console.log("User Found");
            //Just use plain password for demo, no need bcrypt stuff
            if (password === user.password) {
                console.log("Successful Authentication");
                // token will expire in 5 minutes
                //var token = jsonwt.sign({ username, password }, secret, { expiresIn: '1d' });
                const token = generateToken(secret, username, password); 
                console.log("json web token:"+token);
                user.token = token;
                res.status(200).json(user);
            } else {
                console.log("Unsuccessful Authentication");
                //res.status(200).json(user);
            }
        } else {
            console.log("User Not Found");
            //If empty user, use username sysadm and password sysadm
            if ((username === 'sysadm') && (password === 'sysadm')) {
                console.log("Login as sysadmin User");
                var token = jsonwt.sign({ username, password }, secret, { expiresIn: '1d' });
                let user = new User({
                    name : 'sysadm',
                    email : 'sysadm@gmail.com',
                    role : 'Admin',
                    username : 'sysadm',
                    password : 'sysadm'
                })
                user.token = token;
                res.status(200).json(user);
            } else {
                console.log("unknown user");
                // user given but no token
                let user = new User({
                    name : 'sysadm',
                    email : 'sysadm@gmail.com',
                    role : 'Admin',
                    username : 'sysadm',
                    password : 'sysadm'
                })
                res.status(200).json(user);
            }
        }           
    } catch (error) {
        console.log("Error : " + error.message);
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        console.log("Logging Out");   
    } catch (error) {
        console.log("Error : " + error.message);
    }
}

