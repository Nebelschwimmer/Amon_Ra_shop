import React from 'react';
import { ReactComponent as Like } from './like.svg';
import './index.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user_context';
import { findLike } from '../../utils/utils';
import { changePrice } from '../../utils/utils';

export const Card = ({
  pictures, 
  name, 
  discount, 
  price,
  product,
  setParentCounter,
  onProductLike,
  
}) => {
  
  const {currentUser} = React.useContext(UserContext);
 
 
  const isLiked = findLike(product, currentUser)
  const handleLikeClick = () => {
    onProductLike(product)
  ;}
  
    
   
  return (
    <div className='card'>
      <div className='card_top'>
          <div className='card__sticky card__sticky_type_top-left'>
            {!!discount && (
              <span className='card__discount'>
              {discount}&nbsp;%
              </span>
              )}
          </div>    
            <div className='card__sticky card__stick_top-right'>
              <button className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}
              onClick={handleLikeClick}>
                <Like className='card__liked'/>
              </button>
            </div>
    </div>

      <Link to={`/product/${product._id}`} className='card__link'>
        <img src={pictures} alt='card__image' className='card__image'/>
        <div className='card__desc'>
          <span className='card__price'> 
            <span>  
                {
                price &&
                (discount > 0
                ? <span className='card_price_wrapper'>
                    <span className='card_old_price'>{price} ₽</span>
                    <span> {price - changePrice(price, discount)} ₽ </span>
                  </span>
                : <span>{price} ₽</span>)
          }           
            </span>
          </span>
         
          <p className='card__name'>{name}</p>
        </div>
        </Link>
      <span className='card__card btn btn_type_primary' 
      onClick={() => setParentCounter((state) => state + 1)}
      id='basket'>
        В корзину
      </span>
      
    </div>
  );
};