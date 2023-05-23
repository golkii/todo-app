import React, { useState } from 'react';
import FormInput from '../inputs/FormInput';
import BlueButton from '../buttons/blueButton/BlueButton';
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../actions/user';

const SignUp = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const nav = useNavigate()

  function registrationSubmit() {
    if (password !== passwordConfirm) {
      alert('Passwords are not the same')
      return
    }
    signUp(login, password)
    nav('/sign-in')
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

    }
    } className="signin-container">
      <div className='signin'>
        <h1 className='header'>Регистрация</h1>
        <div>
          <label htmlFor="login">Логин</label>
          <FormInput id='login' value={login} setValue={setLogin} name='login' type='text' placeholder='user12345' />
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <FormInput id='password' value={password} setValue={setPassword} name='password' type='password' placeholder='' />
        </div>
        <div>
          <label htmlFor="password">Повторите пароль</label>
          <FormInput id='password-confirm' value={passwordConfirm} setValue={setPasswordConfirm} name='password-confirm' type='password' placeholder='' />
        </div>

        <p>Уже зарегистрированы? <Link to='/sign-in'><span className='link'>Войти</span></Link></p>

        <BlueButton onClick={() => registrationSubmit()} text={'Зарегистрироваться'} />
      </div>
    </form>
  );
};

export default SignUp;