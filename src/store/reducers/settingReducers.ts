import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import src from 'react-select/dist/declarations/src';
import { RootState } from '..';
import Recipe from '../../components/Recipe/Recipe';
import Recipes from '../../components/Recipes/Recipes';
import getCookieValue from '../selectors/getCookie';
import { IStateRecipe } from './recipeReducers';

export interface IStateSettings {
  id: number | undefined;
  name: string;
  email: string;
  recipesFavorites: number[] | undefined;
  recipes: number[] | undefined;
  addFavoris: number | undefined;
  removeFavoris: number | undefined;
  favorisId: number | undefined;
}

const initialState: IStateSettings = {
  id: undefined,
  name: '',
  email: '',
  recipesFavorites: [],
  recipes: [],
  addFavoris: undefined,
  removeFavoris: undefined,
  favorisId: undefined, 
};

export const getUserData = createAsyncThunk('login.getUserData', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}user/show`);
  return data;
});

export const changeSettingsValue = createAction<{
  stateToChange: string;
  value: string | number;
}>('settings/changeSettingsValue');
export const logout = createAction('setting/logout');

export const setFavorisId = createAction<number>('setting/setFavorisId');

export const addFavoris = createAsyncThunk('settings/addfavoris', async (_,thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}favorite/add/${state.setting.favorisId}`);
    return data;
  });

export const removeFavoris = createAsyncThunk('settings/removefavoris', async (_,thunkAPI) => {
   const state = thunkAPI.getState() as RootState;
  const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}favorite/delete/${state.setting.favorisId}`);
 
  return data;
});

export const addToMyRecipe = createAction<IStateRecipe>('settings/addToMyRecipe');



const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSettingsValue, (state, action) => {
      const { stateToChange, value } = action.payload;
      state[stateToChange] = value;
    })
    .addCase(setFavorisId, (state, action) => {
      state.favorisId = action.payload;
    })
    .addCase(addToMyRecipe,(state,action) => {
      state.recipes = [...state.recipes,action.payload]
    })
   .addCase(addFavoris.pending, () => {
      console.log('adding to favorites');
    })
    .addCase(addFavoris.fulfilled, (state, action) => {
      state.recipesFavorites = state.recipesFavorites ? [...state.recipesFavorites, action.payload] : [action.payload];
      
      console.log('added to favorites' , action.payload );
      

    })
    .addCase(addFavoris.rejected, () => {
      console.log('error adding to favorites');
    })
    
    
    .addCase(removeFavoris.pending, () => {
      console.log('removing from favorites');
    })
    .addCase(removeFavoris.fulfilled, (state) => {
     
        state.recipesFavorites = state.recipesFavorites.filter(
          (favoris) => favoris.id !== state.favorisId
        )
            console.log('removed from favorites');
    
    })
    .addCase(removeFavoris.rejected, () => { 
      console.log('error removing from favorites');
    })
      
    
    .addCase(getUserData.pending, () => {
      console.log('retriving user information');
    })
    
    .addCase(getUserData.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.recipesFavorites = [...action.payload.recipesFavorites];
      state.recipes = [...action.payload.recipe];
    })
    .addCase(getUserData.rejected, () => {
      console.log('user data rejected');
    })
    .addCase(logout, (state) => {
      state.id = undefined;
      state.email = '';
      state.name = '';
      state.recipesFavorites = undefined;
      delete axios.defaults.headers.common["Authorization"];
      if (getCookieValue('Bearer'))
      document.cookie = 'Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    });
});

export default settingsReducer;


//  const tableau = [1,2,3,4,5,6,7,8,9,10];

//  const tableau2 = tableau.filter(
//   (number) => number > 5
//  );