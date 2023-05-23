const SET_FOLDERS = "SET_FOLDERS"
const SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER"
const ADD_FOLDER = "ADD_FOLDER"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const SET_RENAME_POPUP_DISPLAY = "SET_RENAME_POPUP_DISPLAY"
const DELETE_FOLDER = "DELETE_FOLDER"
const UPDATE_FOLDER = "UPDATE_FOLDER"
const SET_TODAY = "SET_TODAY"

const defaultState = {
  folders: [],
  currentFolder: null,
  popupDisplay: 'none',
  renamePopupDisplay: 'none',
  today: false
}

export default function folderReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FOLDERS: return { ...state, folders: action.payload }
    case SET_CURRENT_FOLDER: return { ...state, currentFolder: action.payload }
    case ADD_FOLDER: return { ...state, folders: [...state.folders, action.payload] }
    case SET_POPUP_DISPLAY: return { ...state, popupDisplay: action.payload }
    case SET_RENAME_POPUP_DISPLAY: return { ...state, renamePopupDisplay: action.payload }
    // eslint-disable-next-line eqeqeq
    case DELETE_FOLDER: return { ...state, folders: [...state.folders.filter(folder => folder._id !== action.payload)] }
    case UPDATE_FOLDER:
      state.folders.find((el) => el._id === action.payload._id).name = action.payload.name
      return { ...state, folders: [...state.folders] }
    case SET_TODAY: return { ...state, today: action.payload }
    default:
      return state
  }
}

export const setFolders = (folders) => ({ type: SET_FOLDERS, payload: folders })
export const setCurrentFolder = (folder) => ({ type: SET_CURRENT_FOLDER, payload: folder })
export const addFolder = (folder) => ({ type: ADD_FOLDER, payload: folder })
export const setPopupDisplay = (display) => ({ type: SET_POPUP_DISPLAY, payload: display })
export const setRenamePopupDisplay = (display) => ({ type: SET_RENAME_POPUP_DISPLAY, payload: display })
export const deleteFolderAction = (folderId) => ({ type: DELETE_FOLDER, payload: folderId })
export const updateFolderAction = (folder) => ({ type: UPDATE_FOLDER, payload: folder })
export const setToday = (today) => ({ type: SET_TODAY, payload: today })