import { addFolder, deleteFolderAction, setFolders, updateFolderAction } from "../reducers/folderReducer"

export function getFolders() {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:5000/api/folder', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      dispatch(setFolders(result.folders))
    } catch (error) {
      alert(error)
    }
  }
}

export function createFolder(name) {
  return async dispatch => {
    try {
      console.log(name)
      const response = await fetch('http://localhost:5000/api/folder', {
        body: JSON.stringify({
          name
        }),
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        }
      })
      const result = await response.json()
      //console.log(result)
      dispatch(addFolder(result))
    } catch (error) {
      alert(error)
    }
  }
}

export function deleteFolder(folder) {
  return async dispatch => {
    try {
      //console.log(folder)
      const response = await fetch(`http://localhost:5000/api/folder?id=${folder._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const result = await response.json()
      dispatch(deleteFolderAction(folder._id))

      //console.log(result)
      alert(result.message)
    } catch (error) {
      alert(error)
    }
  }
}

export function updateFolder(folder, newName) {
  return async dispatch => {
    try {
      const response = await fetch(`http://localhost:5000/api/folder/update`, {
        method: "POST",
        body: JSON.stringify({
          id: folder._id,
          name: newName
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      })
      const result = await response.json()
      dispatch(updateFolderAction(result.newFolder))
    } catch (error) {
      alert(error)
    }
  }
}