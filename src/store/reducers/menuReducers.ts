/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { createReducer, createAction } from '@reduxjs/toolkit';

interface IDesktop {
  category: boolean;
  profil: boolean;
}

interface IStateMenu {
  isOpen: boolean;
  desktopisOpen: IDesktop;
}

const initilState: IStateMenu = {
  isOpen: false,
  desktopisOpen: { category: false, profil: false },
};

export const toggleMenuIsOpen = createAction('menu/toggleIsOpen');
export const closeDesktopMenu = createAction<string>('menu/closeDesktopMenu');
export const openDesktopMenu = createAction<string>('menu/openDesktopMenu');
export const closeAllDesktopMenu = createAction('menu/closeAllDesktopMenu');

const menuReducer = createReducer(initilState, (builder) => {
  builder
    .addCase(toggleMenuIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(closeDesktopMenu, (state, action) => {
      state.desktopisOpen[action.payload] = false;
    })
    .addCase(openDesktopMenu, (state, action) => {
      state.desktopisOpen[action.payload] = true;
    })
    .addCase(closeAllDesktopMenu, (state) => {
      for (const menu in state.desktopisOpen) {
        state.desktopisOpen[menu] = false;
      }
    });
});

export default menuReducer;
