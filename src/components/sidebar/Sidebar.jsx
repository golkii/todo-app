import React, { useEffect, useState } from 'react';
import "./sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteFolder, getFolders } from '../../actions/folder';
import clock from '../../assets/icons/clock.svg'
import folderIcon from '../../assets/icons/folder.svg'
import add from '../../assets/icons/add.svg'
import { setCurrentFolder, setPopupDisplay, setRenamePopupDisplay, setToday } from '../../reducers/folderReducer';
import more from '../../assets/icons/more.svg'
import Popup from '../popup/Popup';
import RenamePopup from '../popup/RenamePopup';
import { format } from 'date-fns';
import { setTodos } from '../../reducers/todoReducer';

const Sidebar = () => {
  const dispatch = useDispatch()
  const folders = useSelector(state => state.folder.folders)
  const [renamingFolder, setRanmingFolder] = useState('')

  useEffect(() => {
    dispatch(getFolders(folders))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  function showRenamePopupHandler(folder) {
    setRanmingFolder(folder)
    dispatch(setRenamePopupDisplay('flex'))
  }

  return (
    <div className='sidebar'>
      <div className="folder-list">
        <p className='folder' onClick={async () => {
          const today = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'
          const response = await fetch('http://localhost:5000/api/todo/today', {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              deadline: today
            })
          })
          const todos = await response.json()
          dispatch(setTodos(todos.todos))
          dispatch(setToday(true))
        }}><object className='icon' data={clock} type="image/svg+xml">-</object> Сегодня</p>
      </div>
      <h2 className='folder-head'>Folders</h2>
      <div className="folder-list">

        {folders.map(el =>

          <div onClick={() => {
            dispatch(setCurrentFolder(el))
            dispatch(setToday(false))
          }} className='folder' key={el._id}>
            <object className='icon' data={folderIcon} type="image/svg+xml">-</object>
            {el.name}
            <span className='folder-more' onClick={(e) => {
              e.stopPropagation()
            }}>
              <object className='icon' data={more} type="image/svg+xml">...</object>
              <div className="folder-more-block">
                <p onClick={() => showRenamePopupHandler(el)} >Изменить</p>
                <p onClick={() => dispatch(deleteFolder(el))}>Удалить</p>
              </div>
            </span>

          </div>)}

        <p onClick={() => showPopupHandler()} className='folder add-folder'><object className='icon' data={add} type="image/svg+xml">+</object> Добавить</p>
      </div>
      <Popup />
      <RenamePopup folder={renamingFolder} />
    </div>
  );
};

export default Sidebar;