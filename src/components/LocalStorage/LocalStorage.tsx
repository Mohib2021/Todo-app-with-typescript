interface Todo {
    id: number,
    todoText : string
  }
export const setTodoToStorage = (todo:Todo[] )=>{
    localStorage.setItem("Todo",JSON.stringify(todo));
}
export const getTodo = ()=> {
      if(localStorage.getItem("Todo")){
        return JSON.parse(localStorage.getItem("Todo")|| "");
        
      }
}
export const removeTodo = (id:number)=>{
    const prevTodo:Todo[] = getTodo();
    const updatedTodo = prevTodo.filter(todo => todo.id !== id);
    setTodoToStorage(updatedTodo);
}
