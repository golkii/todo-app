import React, { useEffect, useState } from 'react';
import FormInput from '../inputs/FormInput';
import BlueButton from '../buttons/blueButton/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo, setTodoPopupDisplay } from '../../reducers/todoReducer';
import { createTodo, updateTodo } from '../../actions/todo';
import { format } from 'date-fns'

const TodoPopup = () => {
  const [todoName, setTodoName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const todoPopupDisplay = useSelector(state => state.todo.todoPopupDisplay)
  const currentFolder = useSelector(state => state.folder.currentFolder)
  const currentTodo = useSelector(state => state.todo.currentTodo)

  function resetValues() {
    setTodoName('')
    setDeadline('')
    setDescription('')
    dispatch(setCurrentTodo(null))
  }

  useEffect(() => {
    if (currentTodo) {
      const date = new Date(currentTodo.deadline)
      let formatDate = format(date, 'yyyy-MM-dd')
      setTodoName(currentTodo.name)
      setDeadline(formatDate)
      setDescription(currentTodo.description)
    }
  }, [currentTodo])

  function createHandler() {
    resetValues()
    dispatch(setTodoPopupDisplay('none'))
    dispatch(createTodo(currentFolder, { todoName, deadline, description }))
  }

  function updateHandler() {
    resetValues()
    dispatch(setTodoPopupDisplay('none'))
    dispatch(updateTodo(currentTodo._id, { name: todoName, deadline, description, status: currentTodo.status }))
  }

  return (
    <div
      className='popup'
      style={{ display: todoPopupDisplay }}
      onClick={() => {
        resetValues()
        dispatch(setTodoPopupDisplay('none'))
      }}>
      <div className="popup-content" onClick={event => event.stopPropagation()}>
        <div className="popup-header">
          <h1>Задача</h1>
          <button
            onClick={() => {
              resetValues()
              dispatch(setTodoPopupDisplay('none'))
            }}>x</button>
        </div>
        <FormInput value={todoName} setValue={setTodoName} type="text" id="folderName" name="folderName" placeholder="Название" />
        <FormInput value={deadline} setValue={setDeadline} type="date" id="folderName" name="folderName" placeholder="Срок" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" cols="30" rows="8"></textarea>

        {currentTodo
          ?
          <BlueButton text="Изменить" onClick={() => updateHandler()} />
          :
          <BlueButton text="Создать" onClick={() => createHandler()} />
        }

      </div>
    </div>
  );
};

export default TodoPopup;