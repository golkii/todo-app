const SET_TODOS = "SET_TODOS"
const SET_CURRENT_TODO = "SET_CURRENT_TODO"
const ADD_TODO = "ADD_TODO"
const SET_TODO_POPUP_DISPLAY = "SET_TODO_POPUP_DISPLAY"
const DELETE_TODO = "DELETE_TODO"
const UPDATE_TODO = "UPDATE_TODO"

const defaultState = {
  todos: [],
  currentTodo: null,
  todoPopupDisplay: 'none'
}

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TODOS: return { ...state, todos: action.payload }
    case SET_CURRENT_TODO: return { ...state, currentTodo: action.payload }
    case ADD_TODO: return { ...state, todos: [...state.todos, action.payload] }
    case SET_TODO_POPUP_DISPLAY: return { ...state, todoPopupDisplay: action.payload }
    case DELETE_TODO: return { ...state, todos: [...state.todos.filter(todo => todo._id !== action.payload)] }
    case UPDATE_TODO:
      state.todos.find((el) => el._id === action.payload._id).name = action.payload.name
      return { ...state, todos: [...state.todos] }
    default:
      return state
  }
}

export const setTodos = (todos) => ({ type: SET_TODOS, payload: todos })
export const setCurrentTodo = (todo) => ({ type: SET_CURRENT_TODO, payload: todo })
export const addTodoAction = (todo) => ({ type: ADD_TODO, payload: todo })
export const setTodoPopupDisplay = (display) => ({ type: SET_TODO_POPUP_DISPLAY, payload: display })
export const deleteTodoAction = (todoId) => ({ type: DELETE_TODO, payload: todoId })
export const updateTodoAction = (todo) => ({ type: UPDATE_TODO, payload: todo })