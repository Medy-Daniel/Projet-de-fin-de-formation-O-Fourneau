import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './reducers/settingReducers';
import recipeReducers from './reducers/recipeReducers';
import menuReducer from './reducers/menuReducers';
import loginReducer from './reducers/loginReducers';
import registerReducer from './reducers/registerReducers';
import categoryReducer from './reducers/categoryReducers';
import tagReducer from './reducers/tagReducers';
import tipReducer from './reducers/tipReducers';
import ingredientReducer from './reducers/ingredientReducers';
import ustensilReducer from './reducers/ustensilReducers';
import recipeFormReducer from './reducers/recipeFormReducers';
import passwordReducer from './reducers/passwordReducers';
import searchRecuder from './reducers/searchReducer';
import changeUsernameReducer from './reducers/changeUsernameReducers';
// on créé le store et on y définit les différents states et leurs reducers associés

const store = configureStore({
  reducer: {
    setting: settingsReducer,
    recipe: recipeReducers,
    menu: menuReducer,
    login: loginReducer,
    register: registerReducer,
    category: categoryReducer,
    tag: tagReducer,
    tip: tipReducer,
    ingredient: ingredientReducer,
    ustensil: ustensilReducer,
    recipeForm: recipeFormReducer,
    password: passwordReducer,
    search: searchRecuder,
    changeUsername: changeUsernameReducer,
  },
});

// on va récupérer en direct le type de notre state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
