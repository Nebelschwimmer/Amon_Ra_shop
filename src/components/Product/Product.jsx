import s from "./product.module.css";
import truck from "./images/truck.svg";
import quality from "./images/quality.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./images/save.svg";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { UserContext } from '../context/user_context';


export const Product = ({ id, setParentCounter, handleProductLike }) => {
  //Отображение продукта
  const currentUser = useContext(UserContext);
  const [product, setProduct] = useState(false);

  const [productCount, setProductCount] = useState(0);
  const [liked, setLiked] = useState({});

  console.log({ product });
  const isLiked = product?.likes?.some((el) => el === currentUser._id);

  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);
  
  
  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id);
    setLiked(isLiked);
  }, [product.likes?.length, product?.likes, currentUser]);


  
 
  
  //Удаление продукта
  const productID = product._id;
  const deleteProduct = async () => {
    await api.deleteProductById(productID);
  };

  
 
    return (
    <div className={s.container}>
      <button
        className={s.delete_button}
        onClick={() => deleteProduct(productID)}
      >
        Удалить X
      </button>
      <div className={s.title}>{product.name}</div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>{product.price}&nbsp;₽</span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount}&nbsp;%
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
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
            <button
              onClick={() => setParentCounter((state) => state + productCount)}
              className={`btn btn_type_primary ${s.cart}`}
            >
              В корзину
            </button>
          </div>
          <button 
          className={cn(s.favorite, { [s.favoriteActive]: isLiked })}>
            <Save />
            <span>{isLiked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}> {product.wight} </div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}> {product.price} ₽ </div>
          <div className={s.naming}>В наличии:</div>
          <div className={s.description}> {product.stock} шт. </div>
        
        </div>
      </div>
    </div>
  );
};
