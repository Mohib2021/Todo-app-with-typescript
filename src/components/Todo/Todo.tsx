import React, { useEffect, useReducer, useRef, useState } from 'react'
import {  getTodo,  removeTodo,  setTodoToStorage } from '../LocalStorage/LocalStorage';
import { DisplayTodo } from './DisplayTodo';
import "./Todo.css"
 interface Todo {
  id: number,
  todoText : string
}

export const Todo = () => {
  const [myTodo, setMyTodo] = useState<Todo[]>([]);
  const todoRef = React.useRef<HTMLInputElement>(null);
  const submitTodo = (event:React.FormEvent<HTMLFormElement>)=> {
   event.preventDefault();
    if(todoRef.current){
      const updatingTodo = [
        ...myTodo,
        {
          id:myTodo.length,
          todoText: todoRef.current.value
        }
      ]
      setMyTodo(updatingTodo);
      setTodoToStorage(updatingTodo)
      todoRef.current.value = "";
    }
  }
  const deleteTodo = (id:number)=>{
    setMyTodo(myTodo.filter(todo => todo.id !== id));
    removeTodo(id);
  }
  useEffect(()=>{
    const gottenTodoFromStorage = getTodo();
    setMyTodo(gottenTodoFromStorage);
  },[])
  return (
    <section className="todo-section">
      <div className="todo-container">
        <div className="todo-box">
        <h1 className='todo-heading'>Add Todo List</h1>
        <form onSubmit={submitTodo} className='todo-input-form'>
          <input type="text" ref={todoRef} placeholder='Todo Name'  />
          <input type="submit" value="Add" />
        </form>
        <div>
          {myTodo.map(todo => <DisplayTodo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)}
        </div>
        </div>
      </div>
    </section>
  )
}
