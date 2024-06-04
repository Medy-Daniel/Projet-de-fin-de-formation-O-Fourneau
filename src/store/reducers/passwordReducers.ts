import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';

export interface IStatePassword {
  credentials: {
    
    oldPassword: string;
    newPassword: string;
  };
  loading: boolean;
  error: null | string;
}

const initialState: IStatePassword = {
  credentials: {
  
    oldPassword: '',
    newPassword: '',
  },
  loading: false,
  error: null,
};

export const changePasswordValue = createAction<{
  stateRegisterToChange: string;
  value: string;
}>('password/changePasswordValue');



export const changePassword = createAsyncThunk(
  'password/changePassword',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}user/edit`,
      state.password.credentials
    );

    return data;
  }
);
const passwordReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changePasswordValue, (state, action) => {
      const { statePasswordToChange, value } = action.payload;
      state.credentials[statePasswordToChange] = value;
    })
    .addCase(changePassword.pending, (state) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(changePassword.fulfilled, (state, action) => {
     

     
      state.loading = false;
      
     
      // on repasse les champs du formulaire à vide
     
      state.credentials.oldPassword = '';
      state.credentials.newPassword = '';
     console.log('PASSWORD fulfilled... ' , action);
     
      
    })
    .addCase(changePassword.rejected, (state, action) => {
      console.log('PASSWORD rejected... ');
      state.loading = false;
      state.error = action.error.message as string;
      console.log('error', action);
      
     
      
    });
});

export default passwordReducer;
