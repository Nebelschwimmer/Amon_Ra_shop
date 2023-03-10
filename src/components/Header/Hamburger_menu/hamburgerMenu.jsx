import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './hamburgerMenu.css'
import { useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../../utils/utils';


export default HamburgerMenu => {
  const navigate = useNavigate();
 
  return (
    <div>
    <Menu>
      <span className="menu-item" onClick={() => {navigate('/'); scrollOnClick()}}>
        Главная
      </span>
      <span className="menu-item" >
        О компании
      </span>
      <span className="menu-item" >
        Новости
      </span>
      <span className="menu-item">
        Акции 
      </span>
      <span className="menu-item">
        Отзывы
      </span>
      <span className="menu-item">
        Оплата и доставка
      </span>
      <span className="menu-item" onClick={() => {navigate('/faq'); scrollOnClick()}}>
        Часто спрашивают
      </span>
      
       
      
      <a className="menu-item" href="/desserts">
        Обратная связь
      </a>
      <a className="menu-item" href="/desserts">
        Контакты
      </a>
    </Menu>
    </div>
  );
};
