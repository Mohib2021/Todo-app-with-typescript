interface Todo {
    id: number,
    todoText : string
  }
export const setDataToStorage = (todo:Todo[] )=>{
    localStorage.setItem("Todo",JSON.stringify(todo));
}
export const getData = ()=> {
      if(localStorage.getItem("Todo")){
        return JSON.parse(localStorage.getItem("Todo")|| "");
        
      }
}
