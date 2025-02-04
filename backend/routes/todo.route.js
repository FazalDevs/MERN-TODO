import { createTodo, deleteTodo, fetchTodo, updateTodo } from "../controllers/todo.controller.js"
import express from 'express'
import { authenticate } from "../middleware/authorize.js"
const router = express.Router()

router.post('/create', authenticate, createTodo)
router.post('/update/:id', authenticate, updateTodo)
router.delete('/delete/:id', authenticate, deleteTodo)
router.get('/fetch', authenticate, fetchTodo)

export default router