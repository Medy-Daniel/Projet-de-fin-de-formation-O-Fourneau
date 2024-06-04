import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getRandomRecipe } from '../../store/reducers/recipeReducers';
import RecipeSmallCard from '../Recipes/RecipeSmallCard';
import './Home.scss';

export default function Home() {
  const recipe = useAppSelector((state) => state.recipe.recipeRand);
  const tip = useAppSelector((state) => state.tip.randomTip);
  const dispatch = useAppDispatch();
  
  const handleClickNextRecipe = () => {
    dispatch(getRandomRecipe());
  }

  return <div className='home_container'>
    <div className='home_recipe'>
      <h4>A la une</h4>
      <RecipeSmallCard recipe={recipe} />
      <div className='button' onClick={handleClickNextRecipe}> Surprends-moi</div>
    </div>
    <div className='tip_container'>
      <h2>L'astuce du jour </h2>
      <h3 className='tip_title'>{tip?.title}</h3>
      <div className='tip_content'>{tip?.content}</div>
    </div>
  </div>;
}
