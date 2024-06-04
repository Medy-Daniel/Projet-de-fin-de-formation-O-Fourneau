/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Connect from './Connect';
import './Header.scss';
import Menu from './Menu';
import Search from './Search';
// eslint-disable-next-line import/no-absolute-path
import logo from '/logo.png';
import MenuMobile from './MenuMobile';
import User from './User';
import useMediaQuery from '../../hooks/mediaQuery';
import MenuDesktop from './MenuDesktop';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/reducers/searchReducer';

export default function Header() {
  const RecipeList = useAppSelector((state) => state.recipe.list);
  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    dispatch(setSearchValue(''));
    // si on est sur une route de recette unique
    if (RecipeList.length === 1) {
      const { id } = RecipeList[0];
      if (location.pathname !== `/recette/${id}`) navigate(`/recette/${id}`);
    }
    // eslint-disable-next-line no-restricted-globals

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RecipeList]);

  const mobile = useMediaQuery('(max-width: 751px)');
  return (
    <header>
      {mobile ? (
        <>
          <div className="first_row">
            <Menu />
            <Link to="/">
              <div className="header_logo">
                <img src={logo} alt="logo" />
                <h1>O'Fourneau</h1>
              </div>
            </Link>
            <Connect />
          </div>
          <Search />
          <MenuMobile />
          <User />
        </>
      ) : (
        <>
          <div className="first_row">
            <Link to="/">
              <div className="header_logo">
                <img src={logo} alt="logo" />
                <h1>O'Fourneau</h1>
              </div>
            </Link>
            <Search />
            <Connect />
          </div>
          <MenuDesktop />
          <User />
        </>
      )}
    </header>
  );
}
