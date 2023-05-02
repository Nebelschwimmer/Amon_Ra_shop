import { useContext } from "react";
import { CardContext } from "../../components/context/card_context";
import { correctGrammarSearch } from "../../utils/utils";
import { CartSingleProduct } from "./CartSingleProduct/CartSingleProduct";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Product/Back_Button/back_button";

export const Cart = () => {
const { toCartCounter, setToCartCounter, toCart, setToCart } = useContext(CardContext);
const navigate = useNavigate();


// Переменные для вычисления общей цены товаров без скидки, общей скидки, общей стоимости со скидкой c учетом количества товаров
const totalPriceNoDiscount = toCart.map((e) => e.price * e.quantity).reduce((a, b) => a + b, 0);
const totalDiscount = toCart.map((e) => Math.floor((e.price * e.quantity * e.discount) / 100)).reduce((a, b) => a + b, 0);
const finalTotalPrice = totalPriceNoDiscount - totalDiscount;

// Функция для удаления из корзины + уменьшение общего кол-ва товаров в корзине
const removeFromCart = (id, quantity) => {
  const restedItems = toCart.filter((f) => f.id !== id);
  setToCart(restedItems);
  setToCartCounter((state) => state - quantity);
};
// Функция для увеличения кол-ва отдельного товара в корзине + увеличение общего кол-ва товаров в корзине
const increaseSingleProductCount = (id) => {
  setToCart(
      toCart.map((e) => {
      if (e.id === id) e.quantity++ ;
      return e;
      })
  );
  setToCartCounter((state) => state + 1);
};
// Функция для уменьшения кол-ва отдельного товара в корзине + уменьшение общего кол-ва товаров в корзине
const decreaseSingleProductCount = (id) => {
  setToCart(
      toCart.map((e) => {
      if (e.id === id) e.quantity-- ;
      return e;
      })
  );
  setToCartCounter((state) => state - 1);
};

return (
<>
    <div className="cart_top_container">
    <BackButton/>
    {toCartCounter ? (
        <span className="cart_top_title">
        {" "} {toCartCounter} {correctGrammarSearch(toCartCounter)} в корзине
        </span>
    ) : (
        <span className="cart_top_no_goods">Товаров в корзине пока нет</span>
    )}
    </div>
    <div className="cart_container">
    <div>
        <div className="cart_products">
        {toCart?.map((element) => {
            return (
            <CartSingleProduct
              {...element}
              key={element.name}
              product={element}
              id={element.id}
              quantity={element.quantity}
              increaseSingleProductCount={increaseSingleProductCount}
              decreaseSingleProductCount={decreaseSingleProductCount}
              removeFromCart={removeFromCart}
              discount={element.discount}
            />
            );
        })}
        </div>
    </div>
    <div className="cart_total_wrapper">
        <span className="cart_total_title">Ваша корзина</span>
        <div className="cart_total_grid">
        <div className="cart_total_grid_item">
            <span className="cart_total_grid_item_left">
            Количество товаров:
            </span>
            <span className="cart_total_grid_item_right">
            {toCartCounter}
            </span>
        </div>
        {!!totalDiscount && (
            <div className="cart_total_grid_item">
            <span className="cart_total_grid_item_left">Скидка: </span>
            <span className="cart_total_grid_item_discount">
                - {totalDiscount} ₽
            </span>
            </div>
        )}
        </div>
        <div className="cart_total_price_wrapper">
        <span>Общая стоимость</span>
        <span> {finalTotalPrice} ₽</span>
        </div>
        <div className="cart_submit_button_wrapper">
        <button className="cart_submit_button_orange">Оформить заказ</button>
        <button
            className="cart_submit_button"
            onClick={() => {
            navigate("/catalog");
            }}
        >
            В каталог
        </button>
        </div>
    </div>
    </div>
</>
);
};
