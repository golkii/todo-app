import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Main from "./main/Main";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import "./app.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import screen from '../assets/pics/screen.png'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  })

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth &&
          <Routes>
            <Route path="/" element={<div className="info-container">
              <p>Это отличное приложение для того, чтобы планировать свой день. Скорее регистрируйся и приводи в порядок свои планы!</p>
              <img src={screen} alt="" />
            </div>} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        }
        {isAuth &&
          <Routes>
            <Route exact path="/" element={
              <>
                <Sidebar />
                <Main />
              </>
            } />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
