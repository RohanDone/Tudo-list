import { useState, useEffect } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import Footer from "./Components/Footer";
import Head from "./Components/Head";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <Head />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1>📝 To-Do List</h1>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
