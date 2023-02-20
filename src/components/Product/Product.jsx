import s from './product.module.css';
import truck from './images/truck.svg';
import quality from './images/quality.svg';
import cn from 'classnames';
import { ReactComponent as Save } from './images/save.svg';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { useParams } from 'react-router-dom';

const product_id = '63ecf77059b98b038f77b65f';

export const Product = ({ currentUser, id }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);

console.log(Product)
console.log(currentUser)

const isLiked = product?.likes?.some((el) => el === currentUser._id);

  return (
    <>
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
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href='/#' className={`btn btn_type_primary ${s.cart}`}>
              В корзину
            </a>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLiked })}>
            <Save />
            <span>{isLiked ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
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
          <div className={s.description}> {product.price} </div>
          <div className={s.naming}>Описание</div>
          <div className={s.description}>
          {product.description}
          </div>
        </div>
      </div>
    </>
  );
};
