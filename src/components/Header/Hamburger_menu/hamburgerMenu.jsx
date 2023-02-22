import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './hamburgerMenu.css'
export default HamburgerMenu => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Главная
      </a>
      <a className="menu-item" href="/salads">
        О компании
      </a>
      <a className="menu-item" href="/pizzas">
        Новости
      </a>
      <a className="menu-item" href="/desserts">
        Акции
      </a>
      <a className="menu-item" href="/desserts">
        Отзывы
      </a>
      <a className="menu-item" href="/desserts">
        Оплата и доставка
      </a>
      <a className="menu-item" href="/desserts">
        Часто спрашивают
      </a>
      <a className="menu-item" href="/desserts">
        Обратная связь
      </a>
      <a className="menu-item" href="/desserts">
        Контакты
      </a>
    </Menu>
  );
};
