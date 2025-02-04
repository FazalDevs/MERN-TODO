import Todo from "../models/todo.model.js";
export const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        user: req.user._id,
    })
    try {
        const newTodo = await todo.save()
        res.status(201).json({ message: "TODO BAN GAYA", newTodo })
    } catch (error) {
        conole.log(error)
        res.status(404).json({ message: "error in creating todo" })
    }
};
export const fetchTodo = async (req, res) => {

    try {
        const todo = await Todo.find({ user: req.user._id })
        res.status(201).json({ message: "Todos mil gaye", todo })
    } catch (error) {
        conole.log(error)
        res.status(404).json({ message: "error in finding todo" })
    }
};
export const updateTodo = async (req, res) => {

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201).json({ message: "Todos updated", todo })
    } catch (error) {
        conole.log(error)
        res.status(404).json({ message: "error in updating todo" })
    }
};
export const deleteTodo = async (req, res) => {

    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Todos deleted", todo })
    } catch (error) {
        conole.log(error)
        res.status(404).json({ message: "error in deleting todo" })
    }
};
export default {}

