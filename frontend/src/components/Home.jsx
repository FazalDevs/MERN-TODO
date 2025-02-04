import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newtodo, setNewtodo] = useState([])
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:4002/todo/fetch", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                setTodos(response.data.todo)
                setLoading(false)
                console.log(response.data.todo)
            } catch (error) {
                console.log(error);
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchTodos();
    }, [])
    const createTodo = async () => {
        if (!newtodo) return;
        try {
            const response = await axios.post("http://localhost:4002/todo/create", {
                text: newtodo,
                completed: false,
            }, {
                withCredentials: true,
            })
            setTodos([...todos, response.data.newTodo])
            console.log(response.data.newTodo)
            setNewtodo("");
        } catch (error) {
            console.log(error);
            setError(error)
        }

    }
    const updateTodo = async (id) => {

        try {
            const todo = await todos.find((t) => t._id === id);
            const response = await axios.put(`http://localhost:4002/todo/update/${id}`, {
                ...todo,
                completed: !todo.completed,
            }, {
                withCredentials: true,
            });
            setTodos(todos.map((t) => t._id === id ? response.data.todo : t))
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4002/todo/delete/${id}`, {
                withCredentials: true,
            })
            setTodos(todos.filter((t) => t._id !== id))
        } catch (error) {
            console.log(error);
            setError(error);
        }

    }
    const logout = async () => {
        const res = await axios.get("http://localhost:4002/user/logout", {
            withCredentials: true,
        })
        toast.success("User logged out!")
        navigate("/login")
        localStorage.removeItem("jwt")
    }
    const remainingTodos = todos.filter((t) => !t.completed).length;
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Navbar */}
            <nav className="w-full max-w-2xl flex justify-between items-center bg-blue-500 p-4 rounded-lg text-white">
                <h1 className="text-xl font-bold">Todo App</h1>
                <button onClick={() => { logout() }} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition">
                    Logout
                </button>
            </nav>

            {/* Input Field */}
            <div className="mt-6 flex gap-2">
                <input
                    type="text"
                    value={newtodo}
                    onChange={(e) => setNewtodo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && createTodo()}
                    className="p-2 border rounded-lg w-64"
                    placeholder="Enter a task..."
                />
                <button onClick={() => { createTodo() }} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Add
                </button>
            </div>

            { }
            {/* Todo List (Hardcoded) */}
            <ul className="mt-6 w-full max-w-2xl">
                {/* {console.log(todos)} */}
                {/* {if(Array.isArray(todos))} */}
                {todos.map((t, index) => (
                    <li key={t._id || index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" checked={t.completed} onChange={() => { updateTodo(t._id) }} className="mr-2" />
                            <span>{t.text}</span>
                        </div>
                        <button onClick={() => { deleteTodo(t._id) }} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
