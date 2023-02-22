import { ReactComponent as Like } from './like.svg';
import './index.css'
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
export const Card = ({
  pictures, 
  name, 
  discount, 
  price,
  product,
  setParentCounter,
  onProductLike,
  currentUser
}) => {
  
  
  
  const isLiked = product.likes.some((el) => el === currentUser._id);
  const handleLikeClick = () => {
    onProductLike(product);}
    return (
      <div className='card'>
       
       <div className='card__sticky card__sticky_type_top-left'>
        {!!product.discount && (
            <span className='card__discount'>
              {product.discount}&nbsp;%
            </span>
          )}
          </div>
          



        <div className='card__sticky card__stick_top-right'>
          <button className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}
          onClick={handleLikeClick}
          >
            
            <Like className='card__liked'/>
          </button>
        </div>
        <Link to={`/product/${product._id}`} className='card__link'>
          <img src={pictures} alt='card__image' className='card__image'/>
          <div className='card__desc'>
            <span className='card__price'>{price}p</span>
            <span className='card_weight'>1pc</span>
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
  };console.log(Card)