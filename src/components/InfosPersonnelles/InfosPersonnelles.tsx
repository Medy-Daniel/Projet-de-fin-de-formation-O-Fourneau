import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changePassword, changePasswordValue } from '../../store/reducers/passwordReducers';
import './InfosPersonnelles.scss';
import Swal from 'sweetalert2'
import changeUsernameReducer, { changeUsername, changeUsernameValue } from '../../store/reducers/changeUsernameReducers';
import { isFulfilled } from '@reduxjs/toolkit';

export default function InfoPerso() {
  const email = useAppSelector((state) => state.setting.email);
  const username = useAppSelector((state) => state.setting.name);

  const newUsername = useAppSelector((state) => state.changeUsername.credentials.username);
  
  const oldPassword = useAppSelector((state) => state.password.credentials.oldPassword);
  const newPassword = useAppSelector((state) => state.password.credentials.newPassword);
  const dispatch = useAppDispatch();
  
  const handleChangeForm = (e) => {
    dispatch(
      changePasswordValue({
        statePasswordToChange: e.target.name,
        value: e.target.value,
      })
    );
      dispatch(
        changeUsernameValue({
          stateUsernameToChange: e.target.name,
          value: e.target.value,
        })
      );
  };

  const handleClickButtonChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if ( oldPassword === ''){
      Swal.fire({
        title: "Un petit effort!",
        text: "Veuillez remplir tous les champs",
        icon: "warning"
      });
        return;
    }
    if ( newPassword === ''){
      Swal.fire({
        title: "Un petit effort!",
        text: "Veuillez remplir tous les champs",
        icon: "warning"
      });
        return;
    }
   
    if (oldPassword === newPassword) {
      // alert('Les mots de passe sont identiques');
    
      Swal.fire({
        title: "Presque!",
        text: "Les mots de passe sont identiques",
        icon: "error"
      });
      return;
    }
    else {
      Swal.fire({
        text: "Le mot de passe a été modifié",
        icon: "success"
      });
    }
     
dispatch(changePassword());
    
  };

  const handleClickButtonChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ( newUsername === ''){
      Swal.fire({
        title: "Un petit effort!",
        text: "Veuillez remplir le champ",
        icon: "warning"
      });
        return;
    }
    if ( newUsername === username){
      Swal.fire({
        text: "Veuillez mettre un nom d'utilisateur différent de l'ancien",
        icon: "error"
      });
        return;
    }
    else {
      Swal.fire({
        text: "Le nom d'utilisateur a été modifié",
        icon: "success"
      });
    }
    dispatch(changeUsername());
  }
  
  return(
  <div>
<h1 className='title_infos'>Infos Personnelles</h1>
<h2 className='title-user'>Bienvenue sur ton profil {username} !</h2>

<div className='infos'>
<p>email : {email} </p>
<p>Nom d'utilisateur : {username} </p>
</div>
<div className='parent'>
<div className="change_password">
      <h1 className="title_password">Modifier le mot de passe </h1>
<form action="change_password">
       
        <input
          placeholder="Ancien mot de passe"
          type="password"
          value={oldPassword}
          id="oldPassword"
          name="oldPassword"
          onChange={handleChangeForm}
        />

        <input
          placeholder="Nouveau mot de passe"
          type="password"
          value={newPassword}
          id="newPassword"
          name="newPassword"
          onChange={handleChangeForm}
        />
        <div className="button_change_password">
          <button
            className="btn-change"
            type="submit"
            onClick={handleClickButtonChangePassword}
          >
            Modifier
          </button>
        </div>
      </form>
      </div>


      <div className="change_username">
      <h1 className="title_username">Modifier le nom d'utilisateur </h1>
<form action="change_username">
       
        <input
          placeholder="Nouveau nom d'utilisateur"
          type="text"
          value={newUsername}
          id="username"
          name="username"
          onChange={handleChangeForm}
        />

     
        <div className="button_change_username">
          <button
            className="btn-change"
            type="submit"
            onClick={handleClickButtonChangeUsername}
          >
            Modifier
          </button>
        </div>
      </form>
      </div>
      </div>
  </div>
  );
}



