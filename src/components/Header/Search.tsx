import 'boxicons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchValue } from '../../store/reducers/searchReducer';
import React from 'react';
import { search, setSearch } from '../../store/reducers/recipeReducers';

export default function Search() {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleKeyDownSearch = (
    e: React.InputHTMLAttributes<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return;
    if (searchValue === '') return;
    if (location.pathname.search('recettes') !== 1) navigate('/recettes');
    dispatch(setSearch(searchValue))
    dispatch(search());
  };

  const handleChangeSearch = (
    e: React.InputHTMLAttributes<HTMLInputElement>
  ) => {
    dispatch(setSearchValue(e.currentTarget.value));
  };

  return (
    <div className="search_bare">
      <i className="bx bx-search" />
      <input
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDownSearch}
        type="text"
        placeholder="Rechercher une recette"
        value={searchValue}
      />
    </div>
  );
}
