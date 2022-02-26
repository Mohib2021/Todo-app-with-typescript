import React, { useEffect, useReducer, useRef, useState } from 'react'
import { getTodo,  removeTodo,  setTodoToStorage } from '../LocalStorage/LocalStorage';
import { DisplayTodo } from './DisplayTodo';
import "./Todo.css"
 interface Todo {
  id: number,
  todoText : string
}
type actionType = {type:"ADD", todoText : string} | {type:"REMOVE", id: number } | {type: "AddWhenReload", storageTodo : Todo[]};
const reducer = (state:Todo[], action:actionType)=>{
  switch(action.type){
    case "ADD":{
      const updatingTodo = [
        ...state,
        {
          id:state.length,
          todoText: action.todoText
        }
      ]
      setTodoToStorage(updatingTodo);
      return updatingTodo;
    }
      
      case "REMOVE":
        removeTodo(action.id);
        return state.filter(todo => todo.id !== action.id);
      case "AddWhenReload":
        return action.storageTodo;
  }
}
export const Todo = () => {
  const [todo, dispatch] = useReducer(reducer, []);
  const todoRef = React.useRef<HTMLInputElement>(null);
  const submitTodo = (event:React.FormEvent<HTMLFormElement>)=> {
   event.preventDefault();
    if(todoRef.current){
      dispatch({type: "ADD", todoText: todoRef.current.value});
      todoRef.current.value = "";
    }
  }
  const deleteTodo = (id:number)=>{
    dispatch({type: "REMOVE", id: id});
  }
  useEffect(()=>{
    const gottenTodoFromStorage = getTodo();
    if(gottenTodoFromStorage){
      dispatch({type: "AddWhenReload", storageTodo: gottenTodoFromStorage});
    }
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
          {todo.map(todo => <DisplayTodo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)}
        </div>
        </div>
      </div>
    </section>
  )
}
