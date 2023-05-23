import { setUser } from "../reducers/userReducer"

export const signUp = async (login, password) => {
  let requestBody = {
    login,
    password
  }
  try {
    const response = await fetch('http://localhost:5000/api/auth/registration',
      {
        body: JSON.stringify(requestBody),
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        }
      })
    const result = await response.json()
    alert(result.message)

  } catch (error) {
    alert(error)
  }
}

export const signIn = (login, password) => {
  return async dispatch => {
    let requestBody = {
      login,
      password
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/login',
        {
          body: JSON.stringify(requestBody),
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          }
        })
      let result = await response.json()
      dispatch(setUser((result.user)))
      localStorage.setItem('token', result.token)
      console.log((result))
    } catch (error) {
      alert(error)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/auth',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      let result = await response.json()
      if (response.ok) {
        dispatch(setUser((result.user)))
        localStorage.setItem('token', result.token)
      }
    } catch (error) {
      alert(error)
      localStorage.removeItem('token')
    }
  }
}