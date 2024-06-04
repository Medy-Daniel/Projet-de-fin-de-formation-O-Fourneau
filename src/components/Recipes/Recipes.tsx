/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useParams, Navigate } from 'react-router-dom';
import RecipeSmallCard from './RecipeSmallCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import './Recipes.scss';
import slugifyStr from '../../hooks/slugify';
import { clearSearch } from '../../store/reducers/recipeReducers';

export default function Recipes() {
  const categories = useAppSelector((state) => state.category.List);
  const { category } = useParams();
  const categoryId = categories.find((elem) => {
    if (slugifyStr(elem.name) === category) return elem.id;
  })?.id;
  const IsAvalideRout = categories.find(
    (elem) => category === slugifyStr(elem.name)
  );
  const recipe = useAppSelector((state) => state.recipe.list);
  const allRecipes = useAppSelector((state) => state.recipe.listAll);
  const searchValue = useAppSelector((state) => state.recipe.search);
  const dispatch = useAppDispatch();
  let recipes = [...allRecipes];
  let search: string | undefined = undefined;
  if (recipe.length > 1) {
    recipes = recipe;
    search = searchValue;
  }
  if (IsAvalideRout === undefined && category && categories.length) {
    return <Navigate to="/error404" />;
  }
  const handleClickRemoveSearch = () => {
    dispatch(clearSearch());
  };
  const capitalizedCategory =
    category?.charAt(0).toUpperCase() + category?.slice(1);
  return (
    <div className="recipes_category">
      <div className="recipes_head">
        {/* <div className="recipes_filter">
          <p>Filtrer</p>
          <i className="bx bxs-down-arrow" />
        </div> */}
        <h3>{capitalizedCategory ? capitalizedCategory : ''}</h3>
        <div className="recipes_searched">
          {search ? (
            <div className="recipes_searched-remove">
              {search}
              <i
                className="bx bx-x-circle"
                onClick={handleClickRemoveSearch}
              ></i>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="recipes_main">
        {recipes.map((elem) => {
          if (categoryId === elem.category.id || category === undefined)
            return <RecipeSmallCard recipe={elem} key={elem.id} />;
        })}
      </div>
    </div>
  );
}
