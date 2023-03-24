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
import { Link, useNavigate } from "react-router-dom";


export const Header = ({setShowModal}) => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter, isAuthenticated } =
    useContext(UserContext);

    const navigate = useNavigate();

    


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
        {isAuthenticated ?
            <div className='header_auth_available_items'>
              <IconCart count={parentCounter}/>
              <FavouriteButton/>
              <Ankh/>
            <div className='user_info_wrapper'>
                <span><img src={currentUser.avatar} className='user_avatar'/></span>
                <span className='user_info'>{currentUser.name}, {' '} {currentUser.about} </span>
            </div>
        </div>
        : ''
        }
            {!isAuthenticated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
            <IconLogin />
            </Link> 
            :
            
            <IconLogout />
          }
        </div>
       
        
      </div>  
  </div>
   
  
  );
};