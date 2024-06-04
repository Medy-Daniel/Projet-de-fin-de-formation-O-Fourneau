import axios from 'axios';
import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import Swal from 'sweetalert2';

export interface IStateRegister {
  credentials: {
    username: string;
    email: string;
    password: string;
    user_confirm_password: string;
  };
  loading: boolean;
  error: null | string;
}

const initialState: IStateRegister = {
  credentials: {
    username: '',
    email: '',
    password: '',
    user_confirm_password: '',
  },
  loading: false,
  error: null,
};

export const changeRegisterValue = createAction<{
  stateRegisterToChange: string;
  value: string;
}>('register/changeRegisterValue');
export const resetRegisterValue = createAction('register/resetRegisterValue');

// createAsyncThunk prend 2 params => l'action et la thunkAPI (objet store)
// ici je n'ai pas besoin de l'action car pas de payload, comme mon paramètre est nommable/michellisable -> je l'appelle '_' pour indiquer que je ne souhaite pas m'en servir
// je suis obligé de le nommer, car les paramètres sont positionnels -> 1er = action, 2eme = thunkAPI peu importe comment je les nomme
export const register = createAsyncThunk(
  'register/registerForm',
  async (_, thunkAPI) => {
    // ici on va pouvoir exécuter toute la logique asynchrone

    // on récupère la valeur du state via la thunkAPI
    const state = thunkAPI.getState() as RootState;

    try {
    const { data } = await axios.post( `${import.meta.env.VITE_API_URL}register`,
     state.register.credentials
     );

    return data; // => dispatch(login.fulfilled(data))
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
    // tout ce que retourne le callback d'un asyncThunk, est récupéré come 'action.payload' du reducer
  }
);

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeRegisterValue, (state, action) => {
      const { stateRegisterToChange, value } = action.payload;
      state.credentials[stateRegisterToChange] = value;
    })
    .addCase(resetRegisterValue, (state) => {
      state.credentials.username = '';
      state.credentials.email = '';
      state.credentials.password = '';
      state.credentials.user_confirm_password = '';
    })
    // asyncThunk va dispatch des actions en fonction de l'état de la promesse
    // à nous dans nos cases, de choisir le traitement pour chaque état
    .addCase(register.pending, (state) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      // LOGIN FULFILLED -> requête API terminée et n'a pas occasionné d'erreur, je reçois en payload un objet qui contient le pseudo de la personne loggée

      // on enlève tous les états de loading dans l'interface
      state.loading = false;
      // on enregistre le pseudo récupéré dans le payload (ce que retourne le callback de notre asyncThunk) dans notre store
      state.credentials.username = '';
      // on repasse les champs du formulaire à vide
      state.credentials.email = '';
      state.credentials.password = '';
      state.credentials.user_confirm_password = '';
      Swal.fire({
        text: "Le compte à bien été créé!",
        icon: "success"
      });
      
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
      const msg = action.payload.response.data.detail;
      if (msg.search("Duplicate") > 0){
        Swal.fire({
          text: "Le compte existe déjà",
          icon: "error"
        });
      }else{
        Swal.fire({
          text: msg,
          icon: "error"
        });
      }
    });
});

export default registerReducer;
