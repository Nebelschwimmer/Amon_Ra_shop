import s from "./product.module.css";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { UserContext } from '../context/user_context';
import  BackButton  from '../../components/Product/Back_Button/back_button';
import { useNavigate } from 'react-router-dom';
import { findLike } from "../../utils/utils";
import { changePrice } from "../../utils/utils";
import { ModalDelete } from "./ModalDelete/ModalDelete";
import { ReactComponent as Like} from './like.svg'
import CloseIcon from '@mui/icons-material/Close';


export const Product = ({ id, items, setParentCounter, onProductLike }) => {
  // const navigate = useNavigate();
  //Отображение продукта
  
  const currentUser = useContext(UserContext);
  
  //Use-states
  const [product, setProduct] = useState({});
  const [productCount, setProductCount] = useState(1);
  const [liked, setLiked] = useState({});
  
//Use-effect для отображения продукта по id
  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);
//Служебные переменные
  const price = product.price
  const discount = product.discount
  const isLiked = findLike(items, currentUser);
  
  const handleLikeClick = () => {
    onProductLike(product)
  ;}

  const [activeModal, setShowModal] = useState(false);
 
  console.log({isLiked})
  
  return (
      
    <div className={s.container}>
      <div className={s.btns_top}>
        <BackButton/>
         
         
          {/*Кнопка для удаления продукта */}
          <ModalDelete activeModal={activeModal} setShowModal={setShowModal} id={id} >
         </ModalDelete>
        <button onClick={() => setShowModal(true)}
          className={s.delete_button}
          >
          Удалить <CloseIcon/>
        </button>     
      </div>
      
    

      <div className={s.title}>{product.name}</div>
      <div className={s.title_image_price_wrapper}>
      <div className={s.product}>
        {/* Картинка */}
        
        <div className={s.imgWrapper}>
            {/*Условный рендеринг скидки */}
     
                {!!product.discount && (
                         <div className={s.discount_wrapper}>
                          <span className={s.discount}>
                        {product.discount}&nbsp;%
                        </span>
                        </div>
                      )}
                
     
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          
        </div>        
        </div>   
       {/* Контейнер для цены и скидки */}
          <div className={s.price_discount_container}>
              
            {/*Условный рендеринг цены  */}
                
                <span className={s.price}> {
                price &&
                (discount > 0
                ? <span className={s.price_wrapper}>
                    <span className={s.old_price}>{price} ₽</span>
                    <span> {price - changePrice(price, discount)} ₽ </span>
                  </span>
                : <span>{price} ₽</span>)
              }
              </span> 

               {/* Кнопка для лайка */}
              <div className={s.favourite_button_wrapper}>
                  <button className={`${s.favourite_heart} ${isLiked ? s.favourite_heart_Active : s.favourite_heart}`}
                  onClick={handleLikeClick}>
                    <Like className='card__liked'/>
                  </button>
                </div>                  
              
          {/*Описание*/}
      <div className={s.description_container}>
        <h2 className={s.desc_title}>Описание</h2>
        <div className={s.good_description}>{product.description}</div>
        <div className={s.characts}>
            <h2 className={s.desc_title}>Характеристики</h2>
            <div className={s.grid}>
              <div className={s.naming}>Вес:</div>
              <div className={s.description}> {product.wight} </div>
              <div className={s.naming}>Цена:</div>
              <div className={s.description}> {product.price} ₽ </div>
              <div className={s.naming}>В наличии:</div>
              <div className={s.description}> {product.stock} шт. </div>
            </div>
        </div>
      </div>
        
              
              {/* Корзина */}
              <div className={s.cart_container}>
              <button
              onClick={() => setParentCounter((state) => state + productCount)}
              className={s.cart}
            >
              В корзину
          </button>
          
          
          {/*Кнопки для регулирования количества товара, добавляемого в корзину */}
              <div className={s.btnWrap}>
                  <div className={s.count_btns}>
                      <button
                      className={s.minus}
                      onClick={() => productCount > 0 && setProductCount((s) => s - 1)}
                    >
                      -
                      </button>
                      <span className={s.num}>{productCount}</span>
                      <button
                      className={s.plus}
                      onClick={() => setProductCount((s) => s + 1)}
                    >
                      +
                      </button>
                  </div>
                </div>
             
          </div>
        
        
        </div>
        
        </div>
      
      
      
    </div>
  );
};
