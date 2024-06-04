import useMediaQuery from '../../hooks/mediaQuery';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleLoginIsOpen } from '../../store/reducers/loginReducers';
import { toggleMenuIsOpen } from '../../store/reducers/menuReducers';
import { logout } from '../../store/reducers/settingReducers';

export default function Connect() {
  const userIsOpen = useAppSelector((state) => state.login.isOpen);
  const menuIsOpen = useAppSelector((state) => state.menu.isOpen);
  const isLogged = useAppSelector((state) => state.setting.id);

  const dispatch = useAppDispatch();
  const mobile = useMediaQuery('(max-width: 751px)');

  const handleClickOpenButton = () => {
    if (isLogged) {
      dispatch(logout());
    } else {
      dispatch(toggleLoginIsOpen());
      if (menuIsOpen) {
        dispatch(toggleMenuIsOpen());
      }
    }
  };

  return mobile ? (
    <i
      className={userIsOpen ? 'empty-bx' : isLogged ? 'bx bx-user' : 'bx bxs-user'}
      onClick={handleClickOpenButton}
    />
  ) : (
    <div className="connexion" onClick={handleClickOpenButton}>
      <span>{isLogged ? 'Déconnexion' : 'Connexion'}</span>
      <i className={userIsOpen ? 'empty-bx' : 'bx bx-user'} />
    </div>
  );
}
