import React from 'react';
import './navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const login = useSelector(state => state.user.currentUser.login)
  const dispatch = useDispatch()

  return (
    <div className='navbar'>
      <div className="navbar-logo">Todo list</div>

      {!isAuth && <Link to='/sign-in' >
        <div className="login">войти</div>
      </Link>}
      {isAuth &&
        <div className='navbar-buttons'>
          <div className='user-name'>@{login}</div>
          <div className='login'><svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="30" viewBox="0 -960 960 960" width="30"><path d="M484-247q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm-35-146h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg></div>
          <div className='login' onClick={() => dispatch(logout())}><svg className='white-svg' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" /></svg></div>
        </div>
      }
    </div>
  );
};

export default Navbar;