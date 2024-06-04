import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import 'boxicons';
import { toggleMenuIsOpen } from '../../store/reducers/menuReducers';
import { toggleLoginIsOpen } from '../../store/reducers/loginReducers';

export default function Menu() {
  const menuIsOpen = useAppSelector((state) => state.menu.isOpen);
  const userIsOpen = useAppSelector((state) => state.login.isOpen);
  const dispatch = useAppDispatch();
  const handleClicButtonOpenMenu = () => {
    dispatch(toggleMenuIsOpen());
    if (userIsOpen) dispatch(toggleLoginIsOpen());
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <i
      className={menuIsOpen ? 'empty-bx' : 'bx bx-menu'}
      onClick={handleClicButtonOpenMenu}
    />
  );
}
