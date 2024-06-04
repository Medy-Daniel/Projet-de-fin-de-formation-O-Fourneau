import {  useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import RecipeSmallCard from '../Recipes/RecipeSmallCard';
import './MesRecettes.scss';
import { useEffect } from 'react';

export default function MesRecettes() {
  const recettes = useAppSelector((state) => state.setting.recipes);
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.setting.id)
  
  useEffect(() => {
    if (!userId) navigate('/');
  },[userId])

  const handleClickAjoutRecette = (e: React.MouseEvent<HTMLLIElement>) => {
    const urlToNavigate: string = e.currentTarget.getAttribute(
      'data-linkTo'
    ) as string;
    navigate(urlToNavigate);
  };
  
  
  return (
    <div className='container'>
      
      <h1 className='title_recettes'>MesRecettes</h1>
     
      <div className='recettes'>
       {recettes?.map((elem) => <RecipeSmallCard recipe={elem} key={elem.id} />)}
      </div>
      <h2 className='link_ajoutRecette' onClick={handleClickAjoutRecette} data-linkto="/ajoutRecette">
      Ajoute ta recette !
          </h2>
    </div>
  );
}
