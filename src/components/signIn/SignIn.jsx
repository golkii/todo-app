import React, { useState } from 'react';
import "./signin.css"
import BlueButton from '../buttons/blueButton/BlueButton';
import FormInput from '../inputs/FormInput';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { signIn } from '../../actions/user';

const SignIn = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const nav = useNavigate()

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      nav('/')
    }}
      className="signin-container">
      <div className='signin'>
        <h1 className='header'>Вход</h1>
        <div>
          <label htmlFor="login">Логин</label>
          <FormInput id='login' value={login} setValue={setLogin} name='login' type='text' placeholder='user12345' />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <FormInput id='password' value={password} setValue={setPassword} name='password' type='password' placeholder='' />
        </div>

        <p>Еще не зарегистрированы? <Link to='/sign-up' ><span className='link'>Регистрация</span></Link></p>

        <BlueButton onClick={() => dispatch(signIn(login, password))} text={'Войти'} />
      </div>
    </form>
  );
};

export default SignIn;