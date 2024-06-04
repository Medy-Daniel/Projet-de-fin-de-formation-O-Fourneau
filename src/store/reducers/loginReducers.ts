import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface IStateUser {
  credentials: {
    username: string;
    password: string;
  };
  loading: boolean;
  error: null | string;
  isOpen: boolean;
  logged: boolean;

}

const initilState: IStateUser = {
  credentials: {
    username: '',
    password: '',
  },
  loading: false,
  error: null,
  isOpen: false,
  logged: false,
  
};

export const toggleLoginIsOpen = createAction('login/toggleLoginIsOpen');
export const changeLoginValue = createAction('login/changeLoginValue');
export const resetLoginValue = createAction('login/resetLoginValue');

export const register = createAsyncThunk('login/login', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}login_check`,
    state.login.credentials
  );

  return data;
});

const loginReducer = createReducer(initilState, (builder) => {
  builder
    .addCase(toggleLoginIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(changeLoginValue, (state, action) => {
      const { stateLoginToChange, value } = action.payload;
      state.credentials[stateLoginToChange] = value;
    })
    .addCase(resetLoginValue, (state) => {
      state.credentials.username = '';
      state.credentials.password = '';
    })
    .addCase(register.pending, (state) => {
      console.log('LOGIN pending... ');
      state.error = null;
      state.loading = true;
      state.logged = false;
    })
    .addCase(register.fulfilled, (state, action) => {
      // LOGIN FULFILLED -> requête API terminée et n'a pas occasionné d'erreur, je reçois en payload un objet qui contient le pseudo de la personne loggée

      // on enlève tous les états de loading dans l'interface
      state.loading = false;
      state.error = null;
      console.log('LOGIN FULFILLED ACTION :', action);
      // Define expiration date to 1h
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 1000*3600;
      now.setTime(expireTime)
      document.cookie = `Bearer = ${action.payload.token};expires = ${now.toUTCString()}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      state.logged = true;
      state.credentials.username = '';
      state.credentials.password = '';
      state.isOpen = !state.isOpen;
    })
    .addCase(register.rejected, (state, action) => {
      console.log('LOGIN rejected... ');
      state.loading = false;
      state.error = 'Identifiants invalide';
    });
});

export default loginReducer;
