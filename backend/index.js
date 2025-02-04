import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createTodo from './controllers/todo.controller.js';
import todoRoute from '../backend/routes/todo.route.js'
import userRoute from '../backend/routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()

dotenv.config();
const port = process.env.PORT || 4003;

//middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())
//DB connection
const DB_URI = process.env.MONGO_URI;
try {
    await mongoose.connect(DB_URI)
    console.log("connected to DB")
} catch (error) {
    console.log(error);
}

//routes    
app.use(express.json())
app.use('/todo', todoRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})