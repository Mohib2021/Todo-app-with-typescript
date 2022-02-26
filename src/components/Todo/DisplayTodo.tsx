import React from 'react'

interface Todo {
    id: number,
    todoText : string
  }
export const DisplayTodo:React.FunctionComponent<{todo:Todo, deleteTodo:(id:number)=> void}> = ({todo, deleteTodo}) => {
    
  return (
  <React.Fragment>
     <div className="display-todo">
      <h3>{todo.todoText}</h3>
      <button onClick={()=> deleteTodo(todo.id)} >DELETE</button>
  </div>
  </React.Fragment>
    
  )
}
