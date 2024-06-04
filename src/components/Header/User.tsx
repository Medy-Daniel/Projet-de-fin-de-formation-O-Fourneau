/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import './UserMobile.scss';
import {
  changeLoginValue,
  register,
  toggleLoginIsOpen,
} from '../../store/reducers/loginReducers';
import { getUserData } from '../../store/reducers/settingReducers';

export default function User() {
  const password = useAppSelector((state) => state.login.credentials.password);
  const mail = useAppSelector((state) => state.login.credentials.username);
  const userIsOpen = useAppSelector((state) => state.login.isOpen);
  const logged = useAppSelector((state) => state.login.logged);
  const error = useAppSelector((state) => state.login.error);
  const dispatch = useAppDispatch();

  // retrive user information after a login succes
  useEffect(() => {
    if (logged) dispatch(getUserData());
  }, [logged]);

  const handleClickCloseButton = () => {
    dispatch(toggleLoginIsOpen());
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLElement>) => {
    dispatch(
      changeLoginValue({
        stateLoginToChange: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleClickButtonLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(register());
   
  };

  return (
    <div className={userIsOpen ? 'main-user' : 'main-user hidden'}>
      {userIsOpen ? (
        <i className="bx bx-x" onClick={handleClickCloseButton} />
      ) : (
        <i className="bx-empty" />
      )}
      <div className="sub-user">
        <form action="connexion">
          <label htmlFor="mail">E-mail</label>
          <input
            type="email"
            value={mail}
            id="mail"
            name="username"
            onChange={handleChangeForm}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={handleChangeForm}
          />
          {error && <p className='error-message'>{error}</p>}
          <button
            className="button_login"
            type="submit"
            onClick={handleClickButtonLogin}
            
          >
            connexion
          </button>
        </form>
        <p className="password_link">
          {' '}
          Rénitialiser le mot de passe:
          <Link onClick={handleClickCloseButton} to={'/motDePasse'}>
            Par ici
          </Link>
        </p>
        <p className="register_link">
          Par ici pour s'inscrire !
          <Link onClick={handleClickCloseButton} to={'/inscription'}>
            {' '}
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}
