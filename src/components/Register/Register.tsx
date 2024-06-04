import { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  changeRegisterValue,
  resetRegisterValue,
} from '../../store/reducers/registerReducers';
import './Register.scss';
import Swal from 'sweetalert2'
import { register } from '../../store/reducers/registerReducers';
import { redirect } from 'react-router-dom';



export default function Register() {
  const username = useAppSelector(
    (state) => state.register.credentials.username
  );
  const mail = useAppSelector((state) => state.register.credentials.email);
  const password = useAppSelector(
    (state) => state.register.credentials.password
  );
  const confirmPassword = useAppSelector(
    (state) => state.register.credentials.user_confirm_password
  );

  const dispatch = useAppDispatch();


  

  const handleChangeForm = (e) => {
    dispatch(
      changeRegisterValue({
        stateRegisterToChange: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleClickButtonRegister = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Un petit effort!",
        text: "Les mots de passe ne sont pas identiques",
        icon: "warning"
      });
      return;
    }
    dispatch(register());
    
     
    
  };

  return (
    <div className="register_form">
      <h1 className="title">Inscription </h1>
      <form action="register">
        <input
          placeholder="nom d'utilisateur"
          value={username}
          id="username"
          name="username"
          onChange={handleChangeForm}
        />

        <input
          placeholder="E-mail"
          type="email"
          value={mail}
          id="registerMail"
          name="email"
          onChange={handleChangeForm}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          id="registerPassword"
          name="password"
          onChange={handleChangeForm}
        />

        <input
          placeholder=" Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          id="confirm_registerPassword"
          name="user_confirm_password"
          onChange={handleChangeForm}
        />

        <div className="btn_parent_register">
          <button
            className="register_btn"
            type="submit"
            onClick={handleClickButtonRegister}
          >
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}
