/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-named-as-default */
/* eslint-disable prettier/prettier */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.scss';
import Contact from '../Utils/Contact';
import MentionsLegales from '../Utils/MentionsLegales';
import APropos from '../Utils/APropos';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Recipes from '../Recipes/Recipes';
import Password from '../Password/Password';
import Register from '../Register/Register';
import RecipesForm from '../Recipes/RecipesForm';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { category } from '../../store/reducers/categoryReducers';
import { tag } from '../../store/reducers/tagReducers';
import { ingredient } from '../../store/reducers/ingredientReducers';
import { ustensil } from '../../store/reducers/ustensilReducers';
import Loader from '../loader/Loader';
import Recipe from '../Recipe/Recipe';
import InfosPersonnelles from '../InfosPersonnelles/InfosPersonnelles';
import MesRecettes from '../MesRecettes/MesRecettes';
import MesFavoris from '../MesFavoris/MesFavoris';
import getCookieValue from '../../store/selectors/getCookie';
import {
  getUserData,
  logout,
  removeFavoris,
} from '../../store/reducers/settingReducers';
import { getRandomRecipe, listRecipe } from '../../store/reducers/recipeReducers';
import { getRandomTip } from '../../store/reducers/tipReducers';

function App() {
  const Bearer = getCookieValue('Bearer');
  const dispatch = useAppDispatch();
  const categoriesLoad = useAppSelector((state) => state.category.loading);
  const tagsLoad = useAppSelector((state) => state.tag.loading);
  const tipsLoad = useAppSelector((state) => state.tip.loading);
  const ingredientsLoad = useAppSelector((state) => state.ingredient.loading);
  const ustensilsLoad = useAppSelector((state) => state.ustensil.loading);
  const recipeLoad = useAppSelector((state) => state.recipe.loading);
  const changePasswordLoad = useAppSelector((state) => state.password.loading);
  let firstRender = true;
  if (Bearer)
    axios.defaults.headers.common['Authorization'] = `Bearer ${Bearer}`;

  if (!Bearer) {
    if (firstRender) {
      firstRender = false;
    } else {
      dispatch(logout());
    }
  }

  useEffect(() => {
    dispatch(category());
    dispatch(tag());
    dispatch(getRandomTip());
    dispatch(ingredient());
    dispatch(ustensil());
    dispatch(getRandomRecipe());
    dispatch(listRecipe())
    if (Bearer) dispatch(getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body_content">
          {categoriesLoad ||
          tagsLoad ||
          tipsLoad ||
          ingredientsLoad ||
          ustensilsLoad ||
          changePasswordLoad ||
          recipeLoad ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentionsLegales" element={<MentionsLegales />} />
              <Route path="/aPropos" element={<APropos />} />
              <Route path="/recettes/" element={<Recipes />} />
              <Route path="/recettes/:category" element={<Recipes />} />
              <Route path="/recette/:id" element={<Recipe />} />
              <Route path="/motDePasse" element={<Password />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/ajoutRecette" element={<RecipesForm />} />
              <Route
                path="/profil/informations_personnelles"
                element={<InfosPersonnelles />}
              />
              <Route path="/profil/mes_recettes" element={<MesRecettes />} />
              <Route path="/profil/favoris" element={<MesFavoris />} />

              {/*  toutes les routes doivent être mises avant la route Error  */}
              <Route path="*" element={<Error />} />
            </Routes>
          )}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
