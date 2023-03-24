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
import { Rating } from "../Rating/Rating";
import { useForm } from "react-hook-form";
import { ReviewForm} from "./ReviewForm/ReviewForm"
import cn from "classnames";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Product = ({ id, items, setParentCounter, onProductLike, onSendReview, product }) => {
  // const navigate = useNavigate();
  //Отображение продукта
 
  const {currentUser, isAdmin} = useContext(UserContext);
  
  //Use-states

  const [productCount, setProductCount] = useState(1);
  const [liked, setLiked] = useState({});
  const [rate, setRate] = useState(5);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(product.reviews.slice(0, 5) ?? []);
  const [activeModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLikedProduct, setIsLikedProduct] = useState(false);

  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id)
    setIsLikedProduct(isLiked)
  }, [product.likes])

// Создание формы для отзыва
const {
  register,
  handleSubmit,
  reset,
  
} = useForm({ mode: "onSubmit" });

const sendReview = async (data) => {
  const newProduct = await api.addReview(product._id, { text: data.review, rating: rate })
  onSendReview(newProduct);
  setReviewsProduct(state => [...newProduct.reviews])
  setShowForm(false);
  reset()
 
}

const textRegister = register("review", {
  required: true,
  
});


// Use-effect для рейтинга
  useEffect(() => {
    if (!product?.reviews) return;
    const rateAcc = (product.reviews.reduce((acc, el) => acc = acc + el.rating, 0));
    const accum = (Math.floor(rateAcc / product.reviews.length))
    setRate(accum);
    setCurrentRating(accum)
  }, [product?.reviews]);
// Use-effect и функция для поиска пользователей / пользователя
  useEffect(() => {
    api.getUsers().then((data) => setUsers(data))
  }, []);

  const getUser = (id) => {
    if (!users.length) return 'User';
    let user = users.find(e => e._id === id);
    if (user?.avatar.includes('default-image')) {
      user = { ...user, avatar:"https://e7.pngegg.com/pngimages/851/777/png-clipart-computer-icons-ankh-symbol-ancient-egypt-symbol-miscellaneous-text.png"
    }
    }
    
    return user
  }



//useEffect для лайка
  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id)
    setIsLikedProduct(isLiked)
  }, [product.likes])



//Служебные переменные
  const price = product.price
  const discount = product.discount
  
  //Функция для лайка по клику
  const onLike = (e) => {
    onProductLike(product);
  };

  console.log({ product });
 
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  const deleteReview = async (id) => {
    const result = await api.deleteReview(product._id, id)
  }
 
  return (
      
    <div className={s.container}>
      <div className={s.btns_top}>
        <BackButton/>
          {/*Кнопка для удаления продукта */}
          {/* {isAdmin ? */}
          <div>
          <ModalDelete activeModal={activeModal} setShowModal={setShowModal} id={id} >
         </ModalDelete>
        <button onClick={() => setShowModal(true)}
          className={s.delete_button}
          >
          Удалить <CloseIcon/>
        </button>     
      </div>
      {/* : '' */}
    {/* } */}
    </div>
      <div className={s.title}>{product.name}</div>
      <Rating rate={currentRating} setRate={()=>{}} />
      <div className={s.title_image_price_wrapper}>
      <div className={s.product}>
      {/* Картинка и скидка */}
        
        <div className={s.imgWrapper}>
            {/*Условный рендеринг скидки */}
            <div className={s.discount_container}>
                {!!product.discount && (
                         <div className={s.discount_wrapper}>
                          <span className={s.discount}>
                        {product.discount}&nbsp;%
                        </span>
                        </div>
                      )}
              </div>
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
                  <button className={cn(s.favourite_heart, { [s.favourite_heart_Active]: isLikedProduct })} onClick={(e) => onLike(e)}>
                    <Like className='card__liked'/>
                    
                  </button>
                  <span onClick={(e) => onLike(e)}>{isLikedProduct ? "В избранном" : "В избранное"}</span>
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

              <button
              onClick={() => setParentCounter((state) => state + productCount)}
              className={s.cart}
            >
              В корзину
          </button>       
              </div>
            </div>
          </div>
        {/* Отзывы */}
        <div>
        {/* Кнопка для добавления отзывов и отображение формы */}
        <div>
          <button className={s.add_review_btn} onClick={() => setShowForm(true)}>Добавить Отзыв</button>
          {showForm && <div>
            <ReviewForm submitForm={handleSubmit(sendReview)}>
            <div className={s.add_review_top}>
            <Rating rate={rate} isEditable={true} setRate={setRate} /> 
            <span>Оставьте ваш отзыв</span>
              <button className={s.close_review_btn}  onClick={() => setShowForm(false)}><CloseIcon style={{fontSize: '17px'}} className={s.close_review_icon}/></button>
            </div>
              <textarea placeholder='Введите текст' className={s.review_textarea}
                {...textRegister}
              />
              <button className={s.review_submit_btn} type="submit">Оставить отзыв</button>
            </ReviewForm>
          </div>}
        </div>
        {/* Имеющиеся отзывы */}
        {reviewsProduct.length!==0 ?
        reviewsProduct
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((r) => <div key={r._id} className={s.review}>
         
          <div className={s.add_review_top}>
            <div className={s.review_top_left_wrapper}>
              <img src={getUser(r.author)?.avatar} alt="Avatar" className={s.user_avatar} />
              <span className={s.review_author_name}>{getUser(r.author).name ?? 'User'}</span>
              <span className={s.review__date}> {new Date(r.created_at).toLocaleString('ru', options)}</span>
            </div>
            {currentUser._id === r.author &&
            <DeleteOutlineIcon onClick={()=>deleteReview(r._id)}  className={s.review_delete_icon} fontSize="small"/>}
            <Rating rate={r.rating} isEditable={false} />
          </div>
          <div className={s.text}>
            <span>
              {r.text}
            </span>
          </div>

          
        </div>)
        : <span>Отзывов к этому товару пока нет. Добавьте свой!</span>}
      </div>
    </div>
  );
};
