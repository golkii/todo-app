import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import userReducer from "./userReducer"
import folderReducer from "./folderReducer"
import todoReducer from "./todoReducer"

const rootReducer = combineReducers({
  user: userReducer,
  folder: folderReducer,
  todo: todoReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))