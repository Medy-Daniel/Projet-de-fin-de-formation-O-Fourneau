import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { List } from './ingredientReducers';
import { IStateRecipe } from './recipeReducers';


interface IUstensils {
  id: number;
}

interface ITag {
  id: number;
}

interface ICategory {
  id: number;
}

interface IIngredients {
  id: number;
  name: string;
  unit: string;
}

interface IQuantity {
  quantity: number;
  ingredient: IIngredients;
}


export interface IStateRecipeForm {
  RecipeList: {
    name: string;
    picture: string;
    description: string;
    step: string | null;
    ustensil: IUstensils[];
    category: ICategory;
    tag: ITag[];
    quantities: IQuantity[];
  };
  loading: boolean;
  error: null | string;
  searchIngredients: string;
  searchInput: string;
  ingredientList: [];
  file: string | null;
  addedRecipe: null |IStateRecipe
}

const initialState: IStateRecipeForm = {
  RecipeList: {
    name: '',
    picture: '',
    description: '',
    step: '',
    ustensil: [],
    category: { id: 0 },
    tag: [],
    quantities: [],
  },
  loading: false,
  error: null,
  searchIngredients: '',
  searchInput: '',
  ingredientList: [],
  file: null,
  addedRecipe: null,
};

export const changeRecipeFormValue = createAction(
  'recipeForm/changeRecipeFormValue'
);
export const resetRecipeFormValue = createAction(
  'recipeForm/resetRecipeFormValue'
);
export const addUstensil = createAction('recipeForm/addUstensil');
export const removeUstensil = createAction('recipeForm/removeUstensil');
export const addTag = createAction('recipeForm/addTag');
export const removeTag = createAction('recipeForm/removeTag');
export const addCategory = createAction('recipeForm/addCategory');
export const addIngredient = createAction('recipeForm/addIngredient');
export const removeIngredient = createAction('recipeForm/removeIngredient');
export const searchIngredients = createAction<List[]>(
  'ingredient/searchIngredients'
);
export const searchInput = createAction<string>('recipeForm/searchInput');
export const setFile = createAction<string>('recipeForm/SetFile');
export const resetAddedRecipe = createAction('recipeForm/resetAddedRecipe');

export const register = createAsyncThunk(
  'recipeForm/recipeForm',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}recipe/add`,
        state.recipeForm.RecipeList
      );
    return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
);

const recipeFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeRecipeFormValue, (state, action) => {
      const { stateRecipeFormToChange, value } = action.payload;
      state.RecipeList[stateRecipeFormToChange] = value;
    })
    .addCase(setFile, (state,action) => {
      state.file = action.payload;
    })
    .addCase(resetAddedRecipe, (state) => {
      state.addedRecipe = null;
    })
    .addCase(resetRecipeFormValue, (state) => {
      state.RecipeList.name = '';
      state.RecipeList.picture = '';
      state.RecipeList.decription = '';
      state.RecipeList.step = '';
      state.RecipeList.ustensil = [];
      state.RecipeList.category = [];
      state.RecipeList.tag = [];
      state.RecipeList.quantities = [];
      state.searchIngredients = '';
      state.file = null;
    })
    .addCase(addUstensil, (state, action) => {
      const value = { id: action.payload };
      state.RecipeList.ustensil.push(value);
    })
    .addCase(removeUstensil, (state, action) => {
      state.RecipeList.ustensil = state.RecipeList.ustensil.filter(
        (ustensil) => ustensil.id !== action.payload
      );
    })
    .addCase(addTag, (state, action) => {
      const value = { id: action.payload };
      state.RecipeList.tag.push(value);
    })
    .addCase(removeTag, (state, action) => {
      state.RecipeList.tag = state.RecipeList.tag.filter(
        (tag) => tag.id !== action.payload
      ); // on filtre les tags pour ne garder que ceux qui n'ont pas l'id passé en payload
    })

    .addCase(searchInput, (state, action) => {
      state.searchInput = action.payload;
    })
    .addCase(searchIngredients, (state, action) => {
      if (state.searchInput.length) {
        state.ingredientList = action.payload.filter((ingredient) =>
          ingredient.name
            .toLowerCase()
            .includes(state.searchInput.toLowerCase())
        );
      } else {
        state.ingredientList = state.RecipeList.quantities.map(
          (elem) => elem.ingredient
        );
      }
    })
    .addCase(addIngredient, (state, action) => {
      const value = action.payload.ingredients.find(
        (ingredient) => ingredient.id === action.payload.id
      );

      const unitValue = {
        quantity: action.payload.quantity,
        ingredient: value,
      };
      state.RecipeList.quantities = [...state.RecipeList.quantities, unitValue];
      // console.log(action.payload.id);
    })
    .addCase(removeIngredient, (state, action) => {
      console.log(parseInt(action.payload));
      state.RecipeList.quantities = state.RecipeList.quantities.filter(
        (quantitie) => quantitie.ingredient.id !== parseInt(action.payload)
      );
    })
    .addCase(addCategory, (state, action) => {
      state.RecipeList.category.id = action.payload;
    })

    // asyncThunk va dispatch des actions en fonction de l'état de la promesse
    // à nous dans nos cases, de choisir le traitement pour chaque état
    .addCase(register.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      // LOGIN FULFILLED -> requête API terminée et n'a pas occasionné d'erreur, je reçois en payload un objet qui contient le pseudo de la personne loggée

      // on enlève tous les états de loading dans l'interface
      state.loading = false;
      // on enregistre le pseudo récupéré dans le payload (ce que retourne le callback de notre asyncThunk) dans notre store
      state.RecipeList.name = '';
      // on repasse les champs du formulaire à vide
      state.RecipeList.picture = '';
      state.RecipeList.description = '';
      state.RecipeList.step = '';
      state.RecipeList.ustensil = [];
      state.RecipeList.tag = [];
      state.RecipeList.quantities = [];
      state.searchIngredients = '';
      state.file = null;
      state.addedRecipe = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.detail;
    });
});

export default recipeFormReducer;
