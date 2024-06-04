/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenuIsOpen } from '../../store/reducers/menuReducers';
import slugifyStr from '../../hooks/slugify';

export default function MenuMobileContent() {
  const isLogged = useAppSelector((state) => state.setting.id);
  const categories = useAppSelector((state) => state.category.List);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickMenuItem = (e: React.MouseEvent<HTMLLIElement>) => {
    const urlToNavigate: string = e.currentTarget.getAttribute(
      'data-linkTo'
    ) as string;
    dispatch(toggleMenuIsOpen());
    navigate(urlToNavigate);
  };

  return (
    <>
      <div className="sub-menu">
        Catégories
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
      {isLogged && (
        <div className="sub-menu">
          Profil
          <ul>
            <li
              onClick={handleClickMenuItem}
              data-linkto="/profil/informations_personnelles"
            >
              Infos Personnelles
            </li>
            <li onClick={handleClickMenuItem} data-linkto="/profil/favoris">
              Mes favoris
            </li>
            <li
              onClick={handleClickMenuItem}
              data-linkto="/profil/mes_recettes"
            >
              Mes recettes
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
