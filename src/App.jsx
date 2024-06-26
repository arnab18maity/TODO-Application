import { useState } from 'react'
import { TodoProvider, useTodo } from './context'
import { TodoForm, TodoItem } from './components'
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
     setTodos((prev) => [{id : Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id,todo) => {
     setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

      // prev.map((eachVal) => {
      //   if(eachVal.id ===  id) {
      //     todo
      //   }
      //   else eachVal
      // })
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, isComplete : !prevTodo.isComplete} : prevTodo)) 
  }

  // For Fetching the Todos from Local Storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length) {
      setTodos(todos)
    }
  }, [])

  // For pushing the Todos to Local Storage
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your TODOs</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem*/}
                        {todos.map((todo) => (
                          <div key={todo.id} className='w-full'> 
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
      </div>
    </TodoProvider>
  )
}

export default App
