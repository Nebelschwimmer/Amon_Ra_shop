import './footer_style.css'
import { Logo } from '../Logo/Logo';
export const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_left'>
          <div className='footer_left_title_logo'>
          <Logo />
          <span className='footer_left_title'>Амон Ра</span>
          </div>
       `<div className='footer_copyright'>© Интернет-магазин древнеегипетской атрибутики Amon-Ra.ru</div>
       
      </div>
      <div className='footer_center'>
        <div className='footer_center_right'>
          <a href="#">Каталог</a>
          <a href="#">Акции</a>
          <a href="#">Новости</a>
          <a href="#">Отзывы</a>
        </div>
        <div className='footer_center_right'>
          <a href="#">Оплата и доставка</a>
          <a href="#">Часто спрашивают</a>
          <a href="#">Обратная связь</a>
          <a href="#">Контакты</a>
        </div>
      </div>
        <div className='footer_right'>
          <div className='footer_right_contacts'>
            <div className='footer_right_contacts_label'>Мы на связи </div>
            <div className='footer_right_contacts_number'>+7 (999) 00-00-00</div>
            <a className='footer_right_contacts_email'>amon-ra-shop@gmail.com</a>
          </div>
        </div>    
      </div>
    
  );
};
