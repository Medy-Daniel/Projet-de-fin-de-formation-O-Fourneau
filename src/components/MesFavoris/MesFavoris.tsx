import { useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../../hooks/redux';
import RecipeSmallCard from '../Recipes/RecipeSmallCard';
import './MesFavoris.scss';
import { useEffect } from 'react';

export default function MesFavoris() {
  const favoris = useAppSelector((state) => state.setting.recipesFavorites);
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.setting.id)
  // Redirect to home if not logged
  useEffect(() => {
    if (!userId) navigate('/');
  },[userId])



  return (
    <div>
      <h1 className="title_favoris">MesFavoris</h1>
      <div className="favoris">
        {favoris?.map((elem) => (
          <RecipeSmallCard recipe={elem} key={elem.id}    />
        ))}
      </div>
    </div>
  );
}

