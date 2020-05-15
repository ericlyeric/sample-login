import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { getTodos, postTodo } from '../../api/todoApi';
import { useAuthContext } from '../../context/AuthContext';
import Message from '../common/Message';

const Todo = () => {
  const [todo, setTodo] = useState({ name: '' });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useAuthContext();

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  const handleChange = (event) => {
    setTodo({ name: event.target.value });
  };

  const resetForm = () => {
    setTodo({ name: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === 'Unauthorized') {
        setMessage(message);
        authContext.setUser({ username: '', role: '' });
        authContext.setIsAuth(false);
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Enter todo</label>
        <input
          type="text"
          name="todo"
          value={todo.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Please Enter Todo"
        />
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Todo;
