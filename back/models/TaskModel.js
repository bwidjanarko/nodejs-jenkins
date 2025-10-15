import mongoose from "mongoose";

const Task = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required: true
    },
    assignedTo:{
        type: String,
        required: true
    },
});

export default mongoose.model('Tasks', Task);