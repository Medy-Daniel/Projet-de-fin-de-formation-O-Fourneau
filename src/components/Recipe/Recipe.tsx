/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable radix */
import { Navigate, useParams } from 'react-router-dom';
import { startTransition, useEffect, useRef } from 'react';
import './Recipe.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  IComment,
  IStateRecipe,
  addRecipeComment,
  closeCommentForm,
  deleteRecipeComment,
  editRecipeComment,
  searchById,
  setCommentFormRate,
  setCommentFormValue,
  setCommentList,
  setRecipeId,
  setUserComment,
  toggleCommentFormOpen,
} from '../../store/reducers/recipeReducers';
import getRate from '../../store/selectors/getRate';
import Loader from '../loader/Loader';
import { Comment } from '../Recipes/RecipeSmallCard';
import {
  addFavoris,
  removeFavoris,
  setFavorisId,
} from '../../store/reducers/settingReducers';

export default function Recipe() {
  const { id: idstr } = useParams();
  const id = parseInt(idstr as string);
  const userId = useAppSelector((state) => state.setting.id);
  const recipesList = useAppSelector((state) => state.recipe.list);
  const userFavorit = useAppSelector((state) => state.setting.recipesFavorites);
  const loader = useAppSelector((state) => state.recipe.loading);
  const ustensilList = useAppSelector((state) => state.ustensil.List);
  const dispatch = useAppDispatch();
  const commentRef = useRef();
  const commentFormOpen = useAppSelector(
    (state) => state.recipe.commentFormOpen
  );
  const commentFormValue = useAppSelector(
    (state) => state.recipe.commentFromValue
  );
  const commentFormRate = useAppSelector(
    (state) => state.recipe.commentFromRate
  );
  const commentList = useAppSelector((state) => state.recipe.commentList);
  const userComment = useAppSelector((state) => state.recipe.userComment);
  if (id.toString() !== idstr) return <Navigate to="/error404" />;
  const recipe: IStateRecipe | undefined = recipesList?.find(
    (elem) => elem.id === id
  );
  
  if (!recipe) {
    if (!loader) dispatch(searchById(id))
    return <Loader />;
  }
  
  // check if the recipe is in the favorit list if user is logged
  let recipeIsFavorit = false;
  if (userId) {
    if (userFavorit?.find((elem) => elem.id === recipe!.id))
      recipeIsFavorit = true;
  }

  // Load the list of comment in a state, necessary for comment update
  useEffect(() => {
    dispatch(setCommentList(recipe.comments));
    if (userId){
      const comment = recipe.comments?.find((elem) => elem.user.id === userId)
      dispatch(
        setUserComment(comment)
      );
    if(comment){
    dispatch(setCommentFormRate(comment.rate));
    dispatch(setCommentFormValue(comment.content));
    }else{
      dispatch(setCommentFormRate(0));
      dispatch(setCommentFormValue(''));
    }}
    if(commentFormOpen) dispatch(closeCommentForm())
  }, [userId]);

  // list comments list
  let comments: Comment[] | [] = [];
  if (commentList?.length) {
    comments = commentList.map((elem) => {
      const dataObj: Comment = {
        content: elem.content,
        rate: getRate(elem.rate),
        writter: elem.user.name,
        id: elem.id,
      };
      return dataObj;
    });
  }

  //add or remove recipe from favorit
  const handleAddRemoveFav = () => {
    dispatch(setFavorisId(id));
    if (recipeIsFavorit) {
      dispatch(removeFavoris());
    } else {
      dispatch(addFavoris());
    }
  };

  //open / close comment add / edit section
  const handleClickCommentAdd = () => {
    dispatch(toggleCommentFormOpen());
    setTimeout(() => {      
      handleCommentClickButton();
    }, 50);
  };
  const handleChangeCommentFromTextarea = (e: HTMLTextAreaElement) => {
    dispatch(setCommentFormValue(e.currentTarget.value));
  };
  const handleChangeCommentFromRate = (e: HTMLInputElement) => {
    if (Number.isInteger(parseInt(e.currentTarget.value)))
      dispatch(setCommentFormRate(e.currentTarget.value));
  };
  const handleClickCommentValider = () => {
    if (userComment) {
      dispatch(editRecipeComment(userComment.id));
    } else {
      dispatch(addRecipeComment(id));
    }
  };

  const handleClickCommentDelete = () => {
    if (userComment) dispatch(deleteRecipeComment(userComment.id));
  };
  // generate the rate display with star
  const rate = getRate(recipe!.rate);

  // scroll to comment section
  const handleCommentClickButton = () => {
    commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // split the steps of the recipe with the keyword 'Etape'
  let recipeStep = [];
  let recipeKey = 0;
  if (recipe.step) {
    recipeStep = recipe.step.split('Etape').map((elem) => {
      if (elem) recipeKey++;
      return {
        step: (
          <span className="preparation-step" key={recipeKey}>
            Etape
          </span>
        ),
        content: elem,
        key: recipeKey,
      };
    });
  }
  return (
    <div className="recipe_body">
      <div className="recipe_header">
        <div />
        <h2>{recipe?.name}</h2>
        {userId ? (
          <i
            className={recipeIsFavorit ? 'bx bxs-heart' : 'bx bx-heart'}
            onClick={handleAddRemoveFav}
          />
        ) : (
          <div className="empty-bx" />
        )}
      </div>
      <div className="recipe_first_row">
        {}
        <div className="recipe-rating">{rate.map((e) => e)}</div>
        <div
          className="recipe-comment-countbox"
          onClick={handleCommentClickButton}
        >
          Commentaires ({recipe!.comments ? recipe!.comments.length : '0'})
        </div>
      </div>
      <img src={recipe?.picture} alt={recipe?.name} />
      <fieldset className="recipe-description">
        <legend>Description</legend>
        <p className="description">{recipe.description}</p>
      </fieldset>
      <fieldset className="recipe-ingredients">
        <legend>Ingredients</legend>
        <div className="ingredient-list">
          {recipe.quantities.map((elem) => {
            return (
              <div className="ingredient-row" key={elem.id}>
                <span className="ingredient-quantity">
                  {elem.quantity} {elem.ingredient.unit}
                </span>
                <span className="ingredient-name">{elem.ingredient.name}</span>
              </div>
            );
          })}
        </div>
      </fieldset>
      {recipe?.ustensil && (
        <fieldset className="recipe-ustensiles">
          <legend>Ustensiles</legend>
          <div className="ustensile-list">
            {recipe.ustensil.map((elem) => {
              return (
                <div className="ustensile" key={elem.id}>
                  {ustensilList.find((el) => el.id === elem.id)?.name}
                </div>
              );
            })}
          </div>
        </fieldset>
      )}
      {recipe.step && (
        <fieldset className="preparation">
          <legend>Préparation</legend>
          {recipeStep.length > 1 ? (
            recipeStep.map((elem) => {
              if (elem)
                return (
                  <span className="preparation-card" key={elem.key}>
                    {elem.step} {elem.content}
                  </span>
                );
            })
          ) : (
            <span className="preparation-card">{recipe.step}</span>
          )}
        </fieldset>
      )}
      {recipe?.comments && (
        <fieldset ref={commentRef}>
          <legend>Commentaires</legend>
          <div className="comment_section">
            {comments.map((elem) => {
              return (
                <div key={elem.id} className="comment_card">
                  <div className="comment_header">
                    <span className="comment_writter">{elem.writter}</span>
                    <div className="recipe_card-rating">
                      {elem.rate.map((e) => e)}
                    </div>
                  </div>
                  <div className="comment_content">{elem.content}</div>
                </div>
              );
            })}
            {userId &&
              (commentFormOpen ? (
                <div className="comment_form">
                  <textarea
                    onChange={handleChangeCommentFromTextarea}
                    name=""
                    value={commentFormValue}
                  ></textarea>
                  <div className="comment_button_container_edit">
                    <div
                      className="comment_button"
                      onClick={handleClickCommentValider}
                    >
                      valider
                    </div>
                    <div
                      className="comment_button"
                      onClick={handleClickCommentAdd}
                    >
                      annuler
                    </div>
                    <label htmlFor="rate">note</label>
                    <input
                      id="rate"
                      type="number"
                      value={commentFormRate}
                      onChange={handleChangeCommentFromRate}
                    />
                  </div>
                </div>
              ) : userComment ? (
                <div className="comment_button_container">
                  <div
                    className="comment_button"
                    onClick={handleClickCommentAdd}
                  >
                    Modifier
                  </div>
                  <div
                    className="comment_button"
                    onClick={handleClickCommentDelete}
                  >
                    Supprimer
                  </div>
                </div>
              ) : (
                <div className="comment_button" onClick={handleClickCommentAdd}>
                  Ajouter
                </div>
              ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
