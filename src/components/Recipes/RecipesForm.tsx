import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addCategory,
  addIngredient,
  addTag,
  addUstensil,
  changeRecipeFormValue,
  register,
  removeIngredient,
  removeTag,
  removeUstensil,
  resetAddedRecipe,
  searchInput,
  setFile,
} from '../../store/reducers/recipeFormReducers';
import './RecipesForm.scss';
import { searchIngredients } from '../../store/reducers/recipeFormReducers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addToMyRecipe } from '../../store/reducers/settingReducers';


export default function RecipesForm() {
  const recipe_name = useAppSelector(
    (state) => state.recipeForm.RecipeList.name
  );

  const recipe_picture = useAppSelector(
    (state) => state.recipeForm.RecipeList.picture
  );

  const recipe_description = useAppSelector(
    (state) => state.recipeForm.RecipeList.description
  );

  const recipe_preparation = useAppSelector(
    (state) => state.recipeForm.RecipeList.step
  );
  const ustensils = useAppSelector((state) => state.ustensil.List);

  const categories = useAppSelector((state) => state.category.List);

  const tags = useAppSelector((state) => state.tag.List);

  const ingredients = useAppSelector((state) => state.ingredient.List);

  const searchInputIngredient = useAppSelector(
    (state) => state.recipeForm.searchInput
  );

  const listenQuantity = useAppSelector(
    (state) => state.recipeForm.RecipeList.quantities
  );

  const ingredientList = useAppSelector(
    (state) => state.recipeForm.ingredientList
  );
  
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.setting.id)
  const navigate = useNavigate();
  const fileName = useAppSelector((state) => state.recipeForm.file);
  const addedRecipe = useAppSelector((state) => state.recipeForm.addedRecipe);
  const errorMessage = useAppSelector((state) => state.recipeForm.error)
  useEffect(() => {
    if (!userId) navigate('/');
  },[userId])

  useEffect(() => {
    if (addedRecipe !== null) {
      dispatch(addToMyRecipe(addedRecipe))
      navigate('/');
      dispatch(resetAddedRecipe());
    }
  },[addedRecipe])
  //set default category
  if(categories.length){
    dispatch(addCategory(categories[0].id));
  }

  const handleClickButtonAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (fileName !== null){

      const formData = new FormData();
      const file = document.querySelector('#picture_file').files[0]
      formData.append("file",file, file.name);
      axios.post(`${import.meta.env.VITE_API_URL}recipe/upload`,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(function(response){
        dispatch(
          changeRecipeFormValue({
            stateRecipeFormToChange: 'picture',
            value: `${import.meta.env.VITE_IMG_URL}${response.data}`,
          })
        );
        dispatch(register());
      })
    }

  };

  const handleChangeForm = (e) => {
    dispatch(
      changeRecipeFormValue({
        stateRecipeFormToChange: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleChangeCategory = (e) => {
    dispatch(addCategory(e.currentTarget.value));
  };

  const handleClickUstensilOption = (e: any) => {
    if (e.currentTarget.dataset.checked === 'false') {
      dispatch(addUstensil(e.currentTarget.dataset.value));
      e.currentTarget.dataset.checked = 'true';
      e.currentTarget.children[1].checked = true;
      e.currentTarget.children[0].classList.add('checked');
    } else {
      dispatch(removeUstensil(e.currentTarget.dataset.value));
      e.currentTarget.dataset.checked = 'false';
      e.currentTarget.children[1].checked = false;
      e.currentTarget.children[0].classList.remove('checked');
    }
  };

  const handleClickTagOption = (e: any) => {
    console.log(e.currentTarget.children[1].checked);

    if (e.currentTarget.dataset.checked === 'false') {
      dispatch(addTag(e.currentTarget.dataset.value));
      e.currentTarget.dataset.checked = 'true';
      e.currentTarget.children[1].checked = true;
      e.currentTarget.children[0].classList.add('checked');
    } else {
      dispatch(removeTag(e.currentTarget.dataset.value));
      e.currentTarget.dataset.checked = 'false';
      e.currentTarget.children[1].checked = false;
      e.currentTarget.children[0].classList.remove('checked');
    }
  };

  const quantityInput = (dataid:string) => {
    const id = parseInt(dataid);
    const name = ingredientList.find((elem) => elem.id === id).name
    const unit = ingredientList.find((elem) => elem.id === id).unit
    return prompt(`Entrez la quantité de ${name} en ${unit}`);
  };

  const handleClickIngredientOption = (e: any) => {
    if (e.currentTarget.dataset.checked === 'false') {
      const quantity = quantityInput(e.currentTarget.dataset.value);
      if (parseInt(quantity)) {
        dispatch(
          addIngredient({
            id: parseInt(e.currentTarget.dataset.value),
            ingredients: ingredients,
            quantity: parseInt(quantity),
          })
        );
      }else e.currentTarget.children[1].checked = false;
    } else {
      dispatch(removeIngredient(e.currentTarget.dataset.value));
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      dispatch(
        changeRecipeFormValue({
          stateRecipeFormToChange: 'picture',
          value: file.name,
        })
      );
      dispatch(setFile(file.name))
    }
  }

  const handleSearchIngredientsInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(searchInput(e.target.value));
      dispatch(searchIngredients(ingredients));
  };
  return (
    <div>
      {errorMessage &&
      <textarea readOnly className='recipes_form-error' value={errorMessage} />
      }
      <form className="recipes_form">
        <h1 className="title">Ajoute ta recette </h1>
        <input
          placeholder="Nom de la recette"
          type="text"
          value={recipe_name}
          id="recipe_name"
          name="name"
          onChange={handleChangeForm}
        />

        <div className='file_field'>
          <input
            type="url"
            placeholder="Ajoute une image /URL"
            value={recipe_picture}
            id="url"
            name="picture"
            pattern="https://.*"
            size={30}
            required
            onChange={handleChangeForm}
          />
          <input id='picture_file' type="file" onChange={handleChangeFile}/>
        </div>

        <input
          placeholder="Description de la recette"
          value={recipe_description}
          id="recipe_decription"
          name="description"
          onChange={handleChangeForm}
        />

        <input
          placeholder="Etapes de préparation"
          value={recipe_preparation}
          id="recipe_preparation"
          name="step"
          onChange={handleChangeForm}
        />

        <div className="multiple_select">
          {ustensils.map((ustensil) => (
            <div
              className="multiple_select-row"
              key={ustensil.id}
              onClick={handleClickUstensilOption}
              data-value={ustensil.id}
              data-checked={false}
            >
              <div>{ustensil.name}</div>
              <input type="checkbox" />
            </div>
          ))}
        </div>

        <select className="simple_select" onChange={handleChangeCategory}>
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="multiple_select">
          <input
            type="search"
            value={searchInputIngredient}
            id="site-search"
            name="search_ingredients"
            onChange={handleSearchIngredientsInputChange}
            placeholder='Recherche vos ingrédients'
          />
          {ingredientList.map((ingredient) =>
            listenQuantity.find(
              (elem) => elem.ingredient.id === ingredient.id
            ) ? (
              <div
                className="multiple_select-row "
                key={ingredient.id}
                onClick={handleClickIngredientOption}
                data-value={ingredient.id}
                data-checked={true}
              >
                <div className="checked">{ingredient.name}</div>
                <input type="checkbox" checked />
              </div>
            ) : (
              <div
                className="multiple_select-row "
                key={ingredient.id}
                onClick={handleClickIngredientOption}
                data-value={ingredient.id}
                data-checked={false}
              >
                <div>{ingredient.name}</div>
                <input type="checkbox" />
              </div>
            )
          )}
        </div>

        <div className="multiple_select">
          {tags.map((tag) => (
            <div
              className="multiple_select-row"
              key={tag.id}
              onClick={handleClickTagOption}
              data-value={tag.id}
              data-checked={false}
            >
              <div>{tag.name}</div>
              <input type="checkbox" />
            </div>
          ))}
        </div>

        <div className="btn_parent">
          <button className="recipes_btn" onClick={handleClickButtonAdd}>
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
