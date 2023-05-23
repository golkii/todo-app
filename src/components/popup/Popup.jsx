import './popup.css'
import React, { useState } from 'react';
import FormInput from '../inputs/FormInput';
import BlueButton from '../buttons/blueButton/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/folderReducer';
import { createFolder } from '../../actions/folder';

const Popup = () => {
  const [folderName, setFolderName] = useState('')
  const popupDisplay = useSelector(state => state.folder.popupDisplay)
  const dispatch = useDispatch()

  function createHandler() {
    setFolderName('')
    dispatch(setPopupDisplay('none'))
    dispatch(createFolder(folderName))
  }

  return (
    <div
      className='popup'
      style={{ display: popupDisplay }}
      onClick={() => {
        setFolderName('');
        dispatch(setPopupDisplay('none'))
      }}>
      <div className="popup-content" onClick={event => event.stopPropagation()}>
        <div className="popup-header">
          <h1>Введите название</h1>
          <button
            onClick={() => {
              setFolderName('');
              dispatch(setPopupDisplay('none'))
            }}>x</button>
        </div>
        <FormInput value={folderName} setValue={setFolderName} type="text" id="folderName" name="folderName" placeholder="Название папки" />

        <BlueButton text="Создать" onClick={() => createHandler()} />
      </div>
    </div>
  );
};

export default Popup;