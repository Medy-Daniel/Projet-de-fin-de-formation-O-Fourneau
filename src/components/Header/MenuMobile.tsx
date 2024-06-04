/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenuIsOpen } from '../../store/reducers/menuReducers';

import './MenuMobil.scss';
import MenuMobileContent from './MenuMobileContent';

export default function MenuMobile() {
  const menuIsOpen = useAppSelector((state) => state.menu.isOpen);
  const dispatch = useAppDispatch();
  const handleClicButtonCloseMenu = () => {
    dispatch(toggleMenuIsOpen());
  };
  return (
    <div className={menuIsOpen ? 'main-menu' : 'main-menu hidden'}>
      {menuIsOpen ? (
        <i className="bx bx-x" onClick={handleClicButtonCloseMenu} />
      ) : (
        <i className="empty-bx" />
      )}
      <MenuMobileContent />
    </div>
  );
}
