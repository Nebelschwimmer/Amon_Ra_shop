import React, { useContext, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './header_style.css';
import CartIcon from './CartIcon/CartIcon';
import IconLogin from './Login_button/login_button';
import IconLogout from './Logout_button/logout_button';
import {HamburgerMenu} from './Hamburger_menu/HamburgerMenu';
import { Ankh } from './Ankh/Ankh';
import {FavouriteIcon} from './FavouriteIcon/FavouriteIcon'
import { UserContext } from '../context/user_context';
import { Link, useNavigate } from "react-router-dom";
import { Popup } from '../Popup/Popup';
import { FormAddGood } from '../FormAddGood/FormAddGood';
import { ModalEditProduct } from '../Product/EditProductForm/ModalEditProduct';
export const Header = ({setShowModal}) => {
  // Объявление пропсов контекста
  const {searchQuery, setSearchQuery, toCartCounter, isAuthenticated } =
    useContext(UserContext);
  // Стейт для отображения модального окна с формой добавления товаров
  const [isCreateModalActive, setCreateModal] = useState(false);

 //Верстка
  return (
  <div className = 'header' id='head'>
    <div className = 'header__wrapper'>
      {/* Левая часть */}
      <div className = 'header__left'>
            
            {/* Логотип, название и описание */}
            <div className = 'header_title_and_logo_wrapper' >
              {/* Меню-гамбургер */}
            <HamburgerMenu/>
              <Logo/>
              <div className = 'header_title_wrapper'>
                  <div className = 'header__title'>Амон Ра </div>
                  <div className = 'header_title_description'>Магазин древнеегипетской атрибутики</div>
              </div>
            </div>
            {/* Поиск */}
            <Search  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>    
      </div>
      {/* Правая часть */}
      <div className='header__right'>
            <div className = 'header_user_buttons'>
            {isAuthenticated &&
                <div className='header_user_buttons'>
                  <CartIcon count={toCartCounter} />
                  <FavouriteIcon/>
                  <Ankh/>
            </div>
                
            }
            {!isAuthenticated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
            <IconLogin />
            </Link> 
            :
            <IconLogout />
              
              }
              {isAuthenticated &&
              <div className='header_add_good_button_wrapper'>
                  <button className='header_add_good_button' onClick={() => setCreateModal(true)}>Добавить товар</button>
                  {isCreateModalActive && <ModalEditProduct activeModal={isCreateModalActive} setShowModal={setCreateModal}>
                  <FormAddGood setCreateModal={setCreateModal} />
                  </ModalEditProduct>}
              </div>
              }
            </div>
            
      </div>  
    </div>
  </div>
  
  );
};