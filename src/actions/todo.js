import { addTodoAction, deleteTodoAction, setTodos, updateTodoAction } from "../reducers/todoReducer"


export function getTodos(currentFolder) {
  return async dispatch => {
    try {
      const { _id } = currentFolder
      const response = await fetch('http://localhost:5000/api/todo/getTodo', {
        method: 'post',
        body: JSON.stringify({
          folder: _id
        }),
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      dispatch(setTodos(result.todos))
      //return result.todos
    } catch (error) {
      alert(error)
    }
  }
}

export function createTodo(folder, todoInfo) {
  return async dispatch => {
    try {
      const { todoName, deadline, description } = todoInfo
      const response = await fetch('http://localhost:5000/api/todo/createTodo', {
        method: 'POST',
        body: JSON.stringify({
          name: todoName,
          deadline,
          description,
          folder: folder._id,
          status: false
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      dispatch(addTodoAction(result))
      console.log(result)
    } catch (error) {
      alert(error)
    }
  }
}

export function deleteTodo(todo) {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:5000/api/todo/deleteTodo', {
        method: 'POST',
        body: JSON.stringify({
          id: todo._id
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      dispatch(deleteTodoAction(todo._id))
      alert(result.message)
    } catch (error) {
      alert(error)
    }
  }
}

export function updateTodo(id, newInfo) {
  return async dispatch => {
    try {

      const { name, deadline, description, status } = newInfo
      //console.log(name)
      const response = await fetch('http://localhost:5000/api/todo/updateTodo', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          name: name,
          deadline: deadline,
          description: description,
          status: status
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      //console.log(result)
      dispatch(updateTodoAction(result.newTodo))
    } catch (error) {
      alert(error)
    }
  }
}