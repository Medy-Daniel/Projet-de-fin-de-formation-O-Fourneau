/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  closeAllDesktopMenu,
  closeDesktopMenu,
  openDesktopMenu,
} from '../../store/reducers/menuReducers';

import './MenuDesktop.scss';
import slugifyStr from '../../hooks/slugify';

export default function MenuDesktop() {
  interface ITimeOut {
    category: number | undefined;
    profil: number | undefined;
  }
  const timeOut: ITimeOut = { category: undefined, profil: undefined };
  const isLogged = useAppSelector((state) => state.setting.id);
  const menuOpen = useAppSelector((state) => state.menu.desktopisOpen);
  const categories = useAppSelector((state) => state.category.List);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleMouseEnterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const { menu } = e.currentTarget.dataset;
    if (timeOut[menu as keyof ITimeOut]) clearTimeout(timeOut[menu as keyof ITimeOut]);
    dispatch(closeAllDesktopMenu());
    dispatch(openDesktopMenu(menu as keyof ITimeOut));
  };
  const handleMouseLeaveMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const { menu } = e.currentTarget.dataset;
    timeOut[menu as keyof ITimeOut] = setTimeout(() => {
      dispatch(closeDesktopMenu(menu as keyof ITimeOut));
    }, 150);
  };
  const handleClickMenuItem = (e: React.MouseEvent<HTMLLIElement>) => {
    const urlToNavigate: string = e.currentTarget.getAttribute(
      'data-linkTo'
    ) as string;
    dispatch(closeAllDesktopMenu());
    navigate(urlToNavigate);
  };

  return (
    <div className="main-menu--desktop">
      <div
        data-menu="category"
        className="menu--desktop category"
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
      >
        Catégories
      </div>
      {isLogged && (
        <div
          data-menu="profil"
          className="menu--desktop Profil"
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          Profil
        </div>
      )}
      <div
        data-menu="category"
        className={
          // eslint-disable-next-line no-nested-ternary
          menuOpen.category
            ? isLogged
              ? 'menu--desktop-category logged'
              : 'menu--desktop-category'
            : 'menu--desktop-category hidden'
        }
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
      >
        <ul>
          <li onClick={handleClickMenuItem} data-linkto="/recettes">
            Toutes
          </li>
          {categories.map((elem) => (
            <li
              onClick={handleClickMenuItem}
              data-linkto={`/recettes/${slugifyStr(elem.name)}`}
              key={elem.id}
            >
              {elem.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        data-menu="profil"
        className={
          menuOpen.profil
            ? 'menu--desktop-profil'
            : 'menu--desktop-profil hidden'
        }
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
      >
        <ul>
          <li
            onClick={handleClickMenuItem}
            data-linkto="/profil/informations_personnelles"
          >
            Infos personnelles
          </li>
          <li onClick={handleClickMenuItem} data-linkto="/profil/favoris">
            Mes favoris
          </li>
          <li onClick={handleClickMenuItem} data-linkto="/profil/mes_recettes">
            Mes recettes
          </li>
        </ul>
      </div>
    </div>
  );
}
