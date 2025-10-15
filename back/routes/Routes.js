import express from "express";
//import { validatePassword } from "./passwordValidator";

import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    login,
    logout
} from "../controllers/UserController.js";
import {
    getTasks,
    getTasksWithAuth,
    getTasksWithRedis,
    getTaskById,
    saveTask,
    updateTask,
    deleteTask
} from "../controllers/TaskController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', login);
//router.route('/').post(validatePassword, login);
router.post('/logout', logout);
router.get('/tasks', getTasksWithRedis);
router.get('/tasks_auth', getTasksWithAuth);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', saveTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
export default router;
