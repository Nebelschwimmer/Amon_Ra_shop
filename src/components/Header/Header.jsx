import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './header_style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Header = ({ setSearchQuery, searchQuery }) => {

  return (
  <div className = 'header' id='head'>
    <div className = 'container'>
      
      <div className = 'header__wrapper'>
        <div className = 'header__left'>
        
        <Logo />
        <div className = 'header_title_wrapper'>
        <div className = 'header__title'>Амон Ра </div>
        <div className = 'header_title_description'>Магазин древнеегипетской атрибутики</div>
        </div>
          
        </div>
        <Search  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <div className = 'header_auth_buttons'>
        <FontAwesomeIcon icon="fa-regular fa-right-to-bracket" />
          <button className = 'button_sign'>Войти</button>
          <button className =' button_sign'>Регистрация</button>
         </div>
        </div>
      
      </div>
    </div>
  
  );
};