import s from "./product.module.css";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import BackButton from "../../components/Product/Back_Button/back_button";
import { changePrice } from "../../utils/utils";
import { ModalDelete } from "./ModalDelete/ModalDelete";
import { ReactComponent as Like } from "./like.svg";
import CloseIcon from "@mui/icons-material/Close";
import { Rating } from "../Rating/Rating";
import { useForm } from "react-hook-form";
import { ReviewForm } from "./ReviewForm/ReviewForm";
import cn from "classnames";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { openNotification } from "../Notification/Notification";
import { useSelector } from "react-redux";
import { correctGrammarReviews } from "../../utils/utils";
import { EditProductForm } from "./EditProductForm/EditProductForm";
import { ModalEditProduct } from "./EditProductForm/ModalEditProduct";
import { CardContext } from "../context/card_context";

export const Product = ({
  id,
  reviews,
  setToCartCounter,
  onProductLike,
  onUpdateProduct,
  onSendReview,
  onDeleteReview,
  product,
}) => {
  //Use-states
  const [rate, setRate] = useState(5);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(product.reviews);
  const [activeModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLikedProduct, setIsLikedProduct] = useState(false);
  const [productCount, setProductCount] = useState(1);

  const currentUser = useSelector((s) => s.user.data);

  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id);
    setIsLikedProduct(isLiked);
  }, [product.likes, currentUser._id]);

  const { setToCart, toCart} = useContext(CardContext);

  const onClickProductToCart = (product) => {
    const itemToCart = {
      id: product._id,
      name: product.name,
      pictures: product.pictures,
      price: product.price,
      quantity: productCount,
      discount: product.discount
    };
    let isInCart = false
    toCart.filter(el => {
        if (el.id === itemToCart.id) {
        isInCart = true;
        setToCartCounter((state) => state + productCount);
        openNotification("success","Успешно","Товар добавлен в корзину");
        return el.quantity= el.quantity + productCount
        }
        else return el; 
      }
    )
    if (!isInCart) {
      setToCart(() => [...toCart, itemToCart]);
      setToCartCounter((state) => state + productCount);
      openNotification("success","Успешно","Товар добавлен в корзину");
      localStorage.setItem(itemToCart, JSON.stringify(itemToCart))
    }
  }

  // Создание формы для отзыва
  const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });
  const sendReview = async (data) => {
    try {
      const newProduct = await api.addReview(product._id, {
        text: data.review,
        rating: rate,
      });
      onSendReview(newProduct);
      setReviewsProduct((state) => [...newProduct.reviews]);
      setShowForm(false);
      reset();
      openNotification("success", "Успешно", "Ваш отзыв успешно отправлен");
    } catch (error) {
      openNotification(
        "error",
        "Ошибка",
        "Ваш отзыв отправить не удалось. Проверьте, проставлен ли рейтинг."
      );
    }
  };


console.log(product.author.name)


  const textRegister = register("review", {
    required: true,
  });
  // Use-effect для рейтинга
  useEffect(() => {
    if (!product?.reviews) return;
    const rateAcc = product.reviews.reduce(
      (acc, el) => (acc = acc + el.rating), 0);
    const accum = Math.floor(rateAcc / product.reviews.length);
    setRate(accum);
    setCurrentRating(accum);
  }, [product?.reviews]);

  //useEffect для лайка
  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id);
    setIsLikedProduct(isLiked);
  }, [product.likes, currentUser._id]);

  //Служебные переменные
  const price = product.price;
  const discount = product.discount;

  //Функция для лайка по клику
  const onLike = () => {
    onProductLike(product);
  };
  //Для корректного отображения даты в отзывах
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  //Функция для удаления отзыва
  const deleteReview = async (id) => {
    try {
      const res = await onDeleteReview(id);
      openNotification("success", "Успешно", "Ваш отзыв удален.");
      setReviewsProduct(() => [...res.reviews]);
    } catch (error) {
      openNotification("error", "Ошибка", "Ваш отзыв удалить не получилось.");
    }
  };
  // Верстка
  return (
    <div className={s.container}>
      <div className={s.btns_top}>
        <BackButton />
        {/*Кнопка для удаления продукта и модальное окно */}
        <div>
          <ModalDelete
            activeModal={activeModal}
            setShowModal={setShowModal}
            id={id}
          ></ModalDelete>
          <button
            onClick={() => setShowModal(true)}
            className={s.delete_button}
          >
            Удалить <CloseIcon />
          </button>
        </div>
      </div>
      <div className={s.title}>{product.name}</div>
      {/* Рейтинг и кол-во отзывов */}
      <div className={s.rating_wrapper}>
        <Rating rate={currentRating} setRate={() => {}} />
        {reviews.length ? (
          <span>
            {reviews.length} {correctGrammarReviews(reviews.length)}
          </span>
        ) : (
          <span>Отзывов пока нет</span>
        )}
      </div>
      <div className={s.title_image_price_wrapper}>
        <div className={s.product}>
          {/* Картинка и скидка */}
          <div className={s.imgWrapper}>
            {/*Условный рендеринг скидки */}
            <div className={s.discount_container}>
              {!!product.discount && (
                <div className={s.discount_wrapper}>
                  <span className={s.discount}>{product.discount}&nbsp;%</span>
                </div>
              )}
            </div>
            <img className={s.img} src={product.pictures} alt={`Изображение`} />
          </div>
        </div>
        {/* Контейнер для цены и скидки */}
        <div className={s.price_discount_container}>
          {/*Условный рендеринг цены  */}
          <span className={s.price}>
            {" "}
            {price &&
              (discount > 0 ? (
                <span className={s.price_wrapper}>
                  <span className={s.old_price}>{price} ₽</span>
                  <span> {price - changePrice(price, discount)} ₽ </span>
                </span>
              ) : (
                <span>{price} ₽</span>
              ))}
          </span>
          {/* Кнопка для лайка */}
          <div className={s.favourite_button_wrapper}>
            <button
              className={cn(s.favourite_heart, {
                [s.favourite_heart_Active]: isLikedProduct,
              })}
              onClick={(e) => onLike(e)}
            >
              <Like className="card__liked" />
            </button>
            <span onClick={(e) => onLike(e)}>
              {isLikedProduct ? "В избранном" : "В избранное"}
            </span>
          </div>
          {/*Описание*/}
          <div className={s.description_container}>
            <h2 className={s.desc_title}>Описание</h2>
            <div className={s.good_description}>{product.description}</div>
            <div className={s.characts}>
              <h2 className={s.desc_title}>Характеристики</h2>
              <div className={s.grid}>
                <div className={s.naming}>Вес:</div>
                {product.wight ? (
                  <div className={s.description}> {product.wight} </div>
                ) : (
                  "н/д"
                )}
                <div className={s.naming}>Цена без скидки:</div>
                <div className={s.description}> {product.price} ₽ </div>
                <div className={s.naming}>В наличии:</div>
                {product.stock ? (
                  <div className={s.description}> {product.stock} шт. </div>
                ) : (
                  "Товар закончился"
                )}
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
                  onClick={() =>
                    productCount > 1 && setProductCount((s) => s - 1)
                  }
                >
                  -
                </button>
                <span className={s.num}>{productCount}</span>
                <button
                  className={s.plus}
                  onClick={() => productCount > 0 && setProductCount((s) => s + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* В корзину */}
            <button
              onClick={() => {
                !!product.stock
                  ? // setToCartCounter((state) => state + productCount);
                  onClickProductToCart(product)
                  : openNotification(
                      "error","К сожалению, товар закончился",""
                    );
              }}
              className={cn(s.cart, { [s.cart_Disabled]: !product.stock })}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
      {/* Отзывы */}
      <div>
        {/* Кнопка для добавления отзывов, отображение формы для отзыва + редактирование товара */}

        <div>
          <div className={s.btns_bottom_wrapper}>
            <button
              className={s.add_review_btn}
              onClick={() => setShowForm(true)}
            >
              Добавить Отзыв
            </button>
            <button
              className={s.add_update_btn}
              onClick={() => setShowModalEdit(true)}
            >
              Редактировать товар
            </button>
            <ModalEditProduct
              activeModal={showModalEdit}
              setShowModal={setShowModalEdit}
            >
              <EditProductForm
                onUpdateProduct={onUpdateProduct}
                product={product}
                setShowModalEdit={setShowModalEdit}
                id={id}
              />
            </ModalEditProduct>
          </div>
          {/* Отображение формы */}
          {showForm && (
            <div>
              <ReviewForm submitForm={handleSubmit(sendReview)}>
                <div className={s.add_review_top}>
                  {/* Рейтинг */}
                  <Rating rate={rate} isEditable={true} setRate={setRate} />
                  <span>Оставьте ваш отзыв</span>
                  <button
                    className={s.close_review_btn}
                    onClick={() => setShowForm(false)}
                  >
                    <CloseIcon
                      style={{ fontSize: "17px" }}
                      className={s.close_review_icon}
                    />
                  </button>
                </div>
                <textarea
                  placeholder="Введите текст"
                  className={s.review_textarea}
                  {...textRegister}
                />
                <button className={s.review_submit_btn} type="submit">
                  Оставить отзыв
                </button>
              </ReviewForm>
            </div>
          )}
        </div>
        {/* Имеющиеся отзывы */}
        {reviewsProduct.length !== 0 ? (
          reviewsProduct
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((rev) => (
              <div key={rev._id} className={s.review}>
                <div className={s.add_review_top}>
                  <div className={s.review_top_left_wrapper}>
                    <img
                      src={rev.author?.avatar}
                      alt="Avatar"
                      className={s.user_avatar}
                    />
                    <span className={s.review_author_name}>
                      {rev.author?.name ?? "Пользователь"}
                    </span>
                    <span className={s.review__date}>
                      {" "}
                      {new Date(rev.created_at).toLocaleString("ru", options)}
                    </span>
                  </div>
                  {currentUser._id === rev.author._id && (
                    <DeleteOutlineIcon
                      onClick={() => deleteReview(rev._id)}
                      className={s.review_delete_icon}
                      fontSize="small"
                    />
                  )}
                  <Rating rate={rev.rating} isEditable={false} />
                </div>
                <div className={s.text}>
                  <span>{rev.text}</span>
                </div>
              </div>
            ))
        ) : (
          <span>Отзывов к этому товару пока нет. Добавьте свой!</span>
        )}
      </div>
    </div>
  );
};
