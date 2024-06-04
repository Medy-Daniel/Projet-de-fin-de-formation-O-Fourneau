import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changePasswordValue,
  
} from '../../store/reducers/passwordReducers';
import './Password.scss';

export default function MotDePasse() {
  const mail = useAppSelector((state) => state.password.credentials.user_email);
  const password = useAppSelector(
    (state) => state.password.credentials.user_password
  );
  const confirmPassword = useAppSelector(
    (state) => state.password.credentials.user_confirm_password
  );

  const dispatch = useAppDispatch();

  const handleChangeForm = (e) => {
    dispatch(
      changePasswordValue({
        statePasswordToChange: e.target.name,
        value: e.target.value,
      })
    );
  };

 

  return (
    <div className="lost_password">
      <h1 className="title">Nouveau mot de passe </h1>
      <form action="renit_password">
        <input
          placeholder="E-mail"
          type="email"
          value={mail}
          id="mail"
          name="user_email"
          onChange={handleChangeForm}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          id="password"
          name="user_password"
          onChange={handleChangeForm}
        />

        <input
          placeholder="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          id="confirm_password"
          name="user_confirm_password"
          onChange={handleChangeForm}
        />
        <div className="button_renit_password">
          <button
            className="btn-renit"
            type="submit"
            // onClick={handleClickButtonPassword}
          >
            Rénitialiser
          </button>
        </div>
      </form>
    </div>
  );
}
