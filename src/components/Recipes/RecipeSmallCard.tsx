/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  IStateRecipe,
  toggleCommentOpen,
} from '../../store/reducers/recipeReducers';
import getRate from '../../store/selectors/getRate';
import './RecipeSmallCard.scss';
import { addFavoris, removeFavoris, setFavorisId } from '../../store/reducers/settingReducers';
import useMediaQuery from '../../hooks/mediaQuery';

interface Props {
  recipe: IStateRecipe;
}
export interface Comment {
  content: string;
  rate: JSX.Element[] | [];
  writter: string;
  id: number;
}

export default function RecipeSmallCard({ recipe }: Props) {
  const userId = useAppSelector((state) => state.setting.id);
  const userFavorit = useAppSelector((state) => state.setting.recipesFavorites);
  const commentOpen = useAppSelector((state) => state.recipe.commentOpen);
  const dispatch = useAppDispatch();
  const rate = getRate(recipe.rate);
  const navigate = useNavigate();

  // check if the recipe is in the user fav list
  let recipeIsFavorit = false;
  if (userId) {
    if (userFavorit?.find((elem) => elem.id === recipe.id))
      recipeIsFavorit = true;
  }

  // retriving 3 last comments
  const comments: Comment[] | [] = [];
  if (recipe.comments?.length) {
    const arraySize = recipe.comments.length - 1;
    // eslint-disable-next-line no-plusplus
    for (let i = arraySize; i > arraySize - 3; i--) {
      if (i >= 0) {
        const dataObj: Comment = {
          content: recipe.comments[i].content,
          rate: getRate(recipe.comments[i].rate),
          writter: recipe.comments[i].user?.name,
          id: recipe.comments[i].id,
        };
        comments.push(dataObj);
        // }
      }
    }
  }

  //add or remove recipe from favorit
  const handleAddRemoveFav = () => {
    dispatch(setFavorisId(recipe.id));
    if (recipeIsFavorit) {
      dispatch(removeFavoris());
    } else {
      dispatch(addFavoris());
    }
  };

  // toogle display of comments on clic on the comment icon
  const handleClickComment = () => {
    dispatch(toggleCommentOpen(recipe.id));
  };

  // open the recipe detailled page 
  const handleClickRecipeCard = () => {
    navigate(`/recette/${recipe.id}`);
  };

  const mobile = useMediaQuery('(max-width: 751px)');
  return (
    mobile ? 
    <div
      className={
        commentOpen === recipe.id ? 'recipe_card comment' : 'recipe_card'
      }
    >
      <img
        src={recipe.picture}
        alt={recipe.slug}
        onClick={handleClickRecipeCard}
      />
      <h3 onClick={handleClickRecipeCard}>{recipe.name} </h3>
      <div className="recipe_card-foot">
        {comments.length ? (
          <i className="bx bxs-chat" onClick={handleClickComment} />
        ) : (
          <i className="bx bx-chat" />
        )}
        <div className="recipe_card-rating">{rate.map((e) => e)}</div>
        {userId ? (
          <i className={recipeIsFavorit ? 'bx bxs-heart' : 'bx bx-heart'}
          onClick={handleAddRemoveFav} />
        ) : (
          <div className="empty-bx" />
        )}
      </div>
      {commentOpen === recipe.id && (
        <div className="comment_section">
          {comments.map((elem) => {
            return (
              <div key={elem.id} className="comment_card">
                <div className="comment_header">
                  <div>{elem.writter}</div>
                  <div className="recipe_card-rating">
                    {elem.rate.map((e) => e)}
                  </div>
                </div>
                <div className="comment_content">{elem.content}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    :
    <div className='recipe_card-desktop'>
      <div className='recipe_card-desktop--img'>
        <img
          src={recipe.picture}
          alt={recipe.slug}
          onClick={handleClickRecipeCard}
        />
        <div className='recipe_card-desktop--title'>
          <h3 onClick={handleClickRecipeCard}>{recipe.name} </h3>

          <div className="recipe_card-rating">{rate.map((e) => e)}</div>
          {userId ? (
              <i className={recipeIsFavorit ? 'bx bxs-heart' : 'bx bx-heart'}
              onClick={handleAddRemoveFav} />
            ) : (
              <div className="empty-bx" />
            )}
        </div>
        <div className='recipe_card-desktop--description'>{recipe.description}</div>
      </div>
      <div className="comment_section">
        {comments.map((elem) => {
          return (
            <div key={elem.id} className="comment_card">
              <div className="comment_header">
                <div>{elem.writter}</div>
                <div className="recipe_card-rating">
                  {elem.rate.map((e) => e)}
                </div>
              </div>
              <div className="comment_content">{elem.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
