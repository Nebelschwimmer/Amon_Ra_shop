import React, { useContext, useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './header_style.css';
import { api } from '../../utils/api';
import IconCart from './Cart/cart';
import IconLogin from './Login_button/login_button';
import IconLogout from './Logout_button/logout_button';
import HamburgerMenu from '../Header/Hamburger_menu/hamburgerMenu';
import { Ankh_fav } from './Ankh_fav/Ankh_fav';
import {FavouriteButton} from './Favourite/favourite'
import { UserContext } from '../context/user_context';
import { CardContext } from '../context/card_context';


export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter } =
    useContext(UserContext);



  
  //Функция для кнопки добавления нового товара
  const addProductOnClick = async ()=>{
   await api.addProduct()
  }
  const changeUserInfoOnClick = async ()=>{
    await api.changeUserInfo()
   }  
  const changeUserAvatarOnClick = async ()=>{
    await api.changeUserAvatar()  
  }



 //Тело
  return (
  <div className = 'header' id='head'>
      <div className = 'header__wrapper'>
        <div className = 'header__left'>
       
        <HamburgerMenu  />
            <Logo />
            <div className = 'header_title_wrapper'>
            <div className = 'header__title'>Амон Ра </div>
            <div className = 'header_title_description'>Магазин древнеегипетской атрибутики</div>
            </div>
            <Search  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>    
        </div>
        <div className = 'header_user_buttons'>
          <Ankh_fav/>
          <FavouriteButton/>
          
          <IconCart count={parentCounter}/>
          <IconLogin />
        
        </div>
        <div className='user_info_wrapper'>
            <span><img src={currentUser.avatar} className='user_avatar'/></span>
            <span className='user_info'>{currentUser.name}, {' '} {currentUser.about} </span>
           <IconLogout/>
        </div>
        <div className = 'header_admin_buttons'>
          <button className='button_add' onClick={() => addProductOnClick()}>Добавить товар</button>
          <button className =' button_change_user_info' onClick={() => changeUserInfoOnClick()} >Изменить данные пользователя</button>
          <button className =' button_change_user_info' onClick={() => changeUserAvatarOnClick()} >Изменить аватар</button>
          
        
        </div>  
      </div>  
  </div>
   
  
  );
};