import axios from 'axios';
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { IStateSettings } from './settingReducers';
import Eslintrc from '../../../.eslintrc.cjs';

export interface IComment {
  id: number;
  content: string;
  rate: number;
  user: IStateSettings;
}

export interface IIngredient {
  name: string;
  unit: string;
  quantity: number;
}

interface IUstensil {
  id: number;
}

interface ITag {
  id: number;
  name: string;
}

export interface IStateRecipe {
  id: number;
  name: string;
  description: string;
  picture: string;
  slug: string;
  category: { id: number };
  rate: number;
  tags: ITag[] | null;
  ustensil: IUstensil[] | null;
  comments: IComment[] | null;
  ingredients: IIngredient[];
}

export interface IState {
  list: IStateRecipe[];
  listAll: IStateRecipe[];
  recipeRand: IStateRecipe | [];
  loading: boolean;
  error: string;
  search: string;
  commentOpen: boolean | number;
  commentFormOpen: boolean;
  commentFromValue: string;
  commentFromRate: number;
  commentList: IComment[] | null
  userComment : IComment |undefined | boolean
}

const initialState: IState = {
  list: [],
  listAll: [],
  recipeRand: [],
  loading: false,
  error: '',
  search: '',
  commentOpen: false,
  commentFormOpen: false,
  commentFromValue: '',
  commentFromRate: 0,
  commentList: null,
  userComment : false,
};

export const listRecipe = createAsyncThunk('recipe/listRecipe', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}recipe/list`
  );
  return data;
})

export const search = createAsyncThunk('recipe/search', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}search/${state.search.searchValue}`
  );
  return data;
});

export const searchById = createAsyncThunk(
  'recipe/searchById',
  async (id: number) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}recipe/show/${id}`
    );
    return data;
  }
);

export const getRandomRecipe = createAsyncThunk(
  'recipe/getRandomRecipe',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}recipe/random`
    );
    return data;
  }
);


export const addRecipeComment = createAsyncThunk('recipe/addRecipeComment',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState();
    const credentials = {
      content: state.recipe.commentFromValue,
      rate: state.recipe.commentFromRate,
    }
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}comment/add/${id}`,
      credentials
    );
    return data;
  }
);

export const editRecipeComment = createAsyncThunk('recipe/editRecipeComment',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState();
    const credentials = {
      content: state.recipe.commentFromValue,
      rate: state.recipe.commentFromRate,
    }
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}comment/edit/${id}`,
      credentials
    );
    return data;
  }
);

export const deleteRecipeComment = createAsyncThunk('recipe/deleteRecipeComment', async (id: number) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}comment/delete/${id}`
  );
    return data;
})

export const toggleCommentOpen = createAction<number>(
  'recipe/toggleCommentOpen'
);

export const setCommentFormValue = createAction<string>('recipe/setCommentFormValue');
export const setCommentFormRate = createAction<number>('recipe/setCommentFormRate');
export const toggleCommentFormOpen = createAction('recipe/toggleCommentFromOpen');
export const setCommentList = createAction<IComment[]>('recipe/setCommentList');
export const setUserComment = createAction<IComment>('recipe/setUserComment')
export const closeCommentForm = createAction('recipe/closeCommentForm')
export const setSearch = createAction<string>('recipe/setSearch')
export const clearSearch = createAction('recipe/clearSearch')

const recipeReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleCommentOpen, (state, action) => {
      if (state.commentOpen === action.payload) {
        state.commentOpen = false;
      } else {
        state.commentOpen = action.payload;
      }
    })
    .addCase(toggleCommentFormOpen, (state) => {
      state.commentFormOpen = !state.commentFormOpen;
    })
    .addCase(setCommentFormValue,(state, action) => {
      state.commentFromValue = action.payload;
    })
    .addCase(setCommentFormRate, (state,action)=> {
      if (action.payload <= 0 ) {state.commentFromRate = 0;}
      else if (action.payload >5) {state.commentFromRate = 5;}
      else state.commentFromRate = action.payload;
      
    })
    .addCase(setCommentList,(state,action) => {
      state.commentList = action.payload;
    })
    .addCase(setUserComment, (state, action) => {
      state.userComment = action.payload;
    })
    .addCase(closeCommentForm, (state) => {
      state.commentFormOpen = false;
    })
    .addCase(setSearch, (state, action) => {
      state.search = action.payload;
    })
    .addCase(clearSearch, (state) => {
      state.search = '';
      state.list = [];
    })
    .addCase(search.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(search.fulfilled, (state, action) => {
      state.list = [...action.payload];
      state.loading = false;
    })
    .addCase(search.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    })
    .addCase(searchById.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(searchById.fulfilled, (state, action) => {
      state.list = [action.payload];
      state.loading = false;
    })
    .addCase(searchById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    })
    .addCase(getRandomRecipe.pending,(state) => {
      state.error = '';
      state.loading = true;
    })
    .addCase(getRandomRecipe.fulfilled, (state,action) => {
      state.loading = false;
      state.recipeRand= action.payload;
    })
    .addCase(getRandomRecipe.rejected, (state) => {
      state.loading = false;
      state.error = "Une erreure c'est produite";
    })
    .addCase(addRecipeComment.pending, (state) => {
      // state.loading = true;
      state.error = '';
    })
    .addCase(addRecipeComment.fulfilled, (state,action) => {
      state.loading = false;
      state.commentList?.push(action.payload);
      state.commentFormOpen = false;
      state.userComment = action.payload;
    })
    .addCase(addRecipeComment.rejected, (state,action) => {
      state.error = action.payload;
      console.log(action);
    })
    .addCase(editRecipeComment.pending, (state) => {
      // state.loading = true;
      state.error = '';
    })
    .addCase(editRecipeComment.fulfilled, (state,action) => {
      state.loading = false;
      state.commentList = state.commentList?.filter((elem) => elem.id !== action.payload.id)
      state.commentList?.push(action.payload)
      state.commentFormOpen = false;
    })
    .addCase(editRecipeComment.rejected, (state,action) => {
      state.error = action.payload;
      console.log(action);
    })
    .addCase(deleteRecipeComment.pending, (state) => {
      state.error = '';
    })
    .addCase(deleteRecipeComment.fulfilled, (state, action) => {
      console.log(action.payload)
      state.commentList = state.commentList?.filter((elem) => elem.user.id !== action.payload.user.id);
      state.userComment = false;
    })
    .addCase(deleteRecipeComment.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(listRecipe.pending, (state) => {
      state.loading = true;
    })
    .addCase(listRecipe.fulfilled, (state,action) => {
      state.listAll = action.payload;
      state.loading = false;
    })
    .addCase(listRecipe.rejected,( state,action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
});

export default recipeReducers;
