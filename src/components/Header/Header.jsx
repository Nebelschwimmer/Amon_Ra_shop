import React, { useContext, useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './header_style.css';
import { api } from '../../utils/api';
import IconCart from './Cart/cart';
import IconLogin from './Login_button/login_button';
import IconLogout from './Logout_button/logout_button';
import HamburgerMenu from '../Header/Hamburger_menu/hamburgerMenu';
import { Ankh } from './Ankh/Ankh';
import {FavouriteButton} from './Favourite/favourite'
import { UserContext } from '../context/user_context';



export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter } =
    useContext(UserContext);

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
            <IconCart count={parentCounter}/>
            <FavouriteButton/>
            <Ankh/>
            <IconLogin />
        </div>
        <div className='user_info_wrapper'>
            <span><img src={currentUser.avatar} className='user_avatar'/></span>
            <span className='user_info'>{currentUser.name}, {' '} {currentUser.about} </span>
            <IconLogout/>
        </div>
        
      </div>  
  </div>
   
  
  );
};