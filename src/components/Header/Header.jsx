import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './header_style.css';
import { api } from '../../utils/api';
import IconCart from './Cart/cart';
import IconLogin from './Login_button/login_button'
import IconLogout from './Logout_button/logout_button'
export const Header = ({ setSearchQuery, searchQuery, parentCounter, user }) => {

const [counter, setCartCounter] = useState(parentCounter);
  //Функция для кнопки добавления нового товара
  const addProductOnClick = async ()=>{
   await api.addProductOnClick()
  }
  const changeUserInfoOnClick = async ()=>{
    await api.changeUserInfo()
   }    
//Use-effect для корзины
  useEffect(() => {
    setCartCounter((state) => state + 1);
    return () => setCartCounter(parentCounter)
  }, [parentCounter]);
 //Тело
  return (
  <div className = 'header' id='head'>
      <div className = 'header__wrapper'>
        <div className = 'header__left'>
            <Logo />
            <div className = 'header_title_wrapper'>
            <div className = 'header__title'>Амон Ра </div>
            <div className = 'header_title_description'>Магазин древнеегипетской атрибутики</div>
            </div>
            <Search  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>    
        </div>
        <div className = 'header_user_buttons'>
          <IconCart count={counter}/>
          <IconLogin/>
          
        </div>
        <div className='user_info_wrapper'>
            <span className='user_info'>{user.name}, {' '} {user.about} </span>
           <IconLogout/>
        </div>
        <div className = 'header_admin_buttons'>
        
          <button className='button_add' onClick={() => addProductOnClick()}>Добавить товар</button>
          <button className =' button_change_user_info' onClick={() => changeUserInfoOnClick()} >Изменить данные пользователя</button>
          
        </div>  
      </div>  
  </div>
   
  
  );
};