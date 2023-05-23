import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './main.css'
import { deleteTodo, getTodos, updateTodo } from '../../actions/todo';
import more from '../../assets/icons/more.svg'
import TodoPopup from '../popup/TodoPopup';
import { setCurrentTodo, setTodoPopupDisplay } from '../../reducers/todoReducer';
import { format } from 'date-fns';

const Main = () => {
  const dispatch = useDispatch()
  const currentFolder = useSelector(state => state.folder.currentFolder)
  const todos = useSelector(state => state.todo.todos)
  const today = useSelector(state => state.folder.today)
  const [uncheckedFilter, setUncheckedFilter] = useState(false)

  useEffect(() => {
    if (!today) {
      dispatch(getTodos(currentFolder))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder, today])

  return (
    <div className='main'>
      <div className="container">

        {currentFolder && <>
          <h1>{today ? 'Сегодня' : currentFolder.name}</h1>
          <input type="checkbox" defaultChecked={uncheckedFilter} onClick={(e) => setUncheckedFilter(!uncheckedFilter)} name="" id="" /><label style={{ display: 'inline' }} htmlFor="">Невыполненные</label>
          <div className="todo-list">
            {todos && todos.map((el) => {
              return (!uncheckedFilter || !el.status) && <div className='todo-container' key={el._id}>
                <input
                  className='todo-status'
                  type="checkbox"
                  name={el._id}
                  id={el._id}
                  defaultChecked={el.status}
                  onClick={() => dispatch(updateTodo(el._id, { name: el.name, deadline: el.deadline, description: el.description, status: !el.status }))} />
                <h3 className="todo-name">{el.name}</h3>
                <div className='more-button'>
                  <object data={more} type="image/svg+xml">+</object>
                  <div className="todo-more-block">
                    <p onClick={() => {
                      dispatch(setCurrentTodo(el))
                      dispatch(setTodoPopupDisplay('flex'))
                    }} >Изменить</p>
                    <p onClick={() => dispatch(deleteTodo(el))}>Удалить</p>
                  </div>
                </div>
                <div className="todo-deadline">{format(new Date(el.deadline), 'yyyy-MM-dd')}</div>
                <div className="description">{el.description}</div>
              </div>
            }
            )}

          </div>
          <div className='add-todo' onClick={() => dispatch(setTodoPopupDisplay('flex'))}>Добавить задачу</div>
          <TodoPopup />
        </>
        }
      </div>
    </div >
  );
};

export default Main