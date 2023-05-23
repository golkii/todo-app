import './popup.css'
import React, { useEffect, useState } from 'react';
import FormInput from '../inputs/FormInput';
import BlueButton from '../buttons/blueButton/BlueButton';
import { useDispatch, useSelector } from 'react-redux';
import { setRenamePopupDisplay } from '../../reducers/folderReducer';
import { updateFolder } from '../../actions/folder';

const RenamePopup = (props) => {
  const [folderName, setFolderName] = useState('')
  const renamePopupDisplay = useSelector(state => state.folder.renamePopupDisplay)
  const dispatch = useDispatch()

  useEffect(() => {
    setFolderName(props.folder.name)
  }, [props.folder.name])

  function createHandler() {
    setFolderName('')
    dispatch(setRenamePopupDisplay('none'))
    dispatch(updateFolder(props.folder, folderName))
  }

  return (
    <div
      className='popup'
      style={{ display: renamePopupDisplay }}
      onClick={() => {
        setFolderName('');
        dispatch(setRenamePopupDisplay('none'))
      }}>
      <div className="popup-content" onClick={event => event.stopPropagation()}>
        <div className="popup-header">
          <h1>Введите название</h1>
          <button
            onClick={() => {
              setFolderName('');
              dispatch(setRenamePopupDisplay('none'))
            }}>x</button>
        </div>
        <FormInput value={folderName} setValue={setFolderName} type="text" id="folderName" name="folderName" placeholder="Название папки" />

        <BlueButton text="Изменить" onClick={() => createHandler()} />
      </div>
    </div>
  );
};

export default RenamePopup;