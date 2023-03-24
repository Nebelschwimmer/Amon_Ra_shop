import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './hamburgerMenu.css'
import { useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../../utils/utils';



export default HamburgerMenu => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

 
 
  return (
    <div>
    <Menu
    isOpen={isMenuOpen} onStateChange={handleStateChange}
    >  
      <span className="menu-item" onClick={() => {navigate('/'); scrollOnClick(); handleCloseMenu()}}>
        Главная
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}} >
        Каталог
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/favourites'); scrollOnClick(); handleCloseMenu()}}  >
        Избранное
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}} >
        Новости
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}}>
        Акции 
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}}>
        Отзывы
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}}>
        Оплата и доставка
      </span>
      
      <span className="menu-item" onClick={() => {navigate('/faq'); scrollOnClick(); handleCloseMenu()}}>
        Часто спрашивают
      </span>
     
      <a className="menu-item" href="/desserts" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}}> 
        Обратная связь
      </a>
     
      <a className="menu-item" href="/desserts" onClick={() => {navigate('/catalog'); scrollOnClick(); handleCloseMenu()}}>
        Контакты
      </a>
    </Menu>
    </div>
  );
};
