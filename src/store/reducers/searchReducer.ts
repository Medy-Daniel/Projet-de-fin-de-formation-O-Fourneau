import { createAction, createReducer } from '@reduxjs/toolkit';

interface ISearch {
  searchValue: string;
}

const initialState: ISearch = {
  searchValue: '',
};

export const setSearchValue = createAction<string>('search/setSearchValue');

const searchRecuder = createReducer(initialState, (builder) => {
  builder.addCase(setSearchValue, (state, action) => {
    state.searchValue = action.payload;
  });
});

export default searchRecuder;
