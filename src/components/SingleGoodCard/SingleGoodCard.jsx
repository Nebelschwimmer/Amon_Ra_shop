import { ReactComponent as Like } from "./like.svg";
import "./index.css";
import { Link} from "react-router-dom";
import { CardContext } from "../context/card_context";
import { findLike } from "../../utils/utils";
import { changePrice } from "../../utils/utils";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChangedProductLike } from "../../storageToolKit/products/productSlice";
import cn from "classnames";
import { openNotification } from "../Notification/Notification";


export const SingleGoodCard = ({
  pictures,
  name,
  discount,
  price,
  product,
  id,
}) => {
const currentUser = useSelector((state) => state.user.data);
const dispatch = useDispatch();
const { handleAddProductToCart } = useContext(CardContext);

const onAddingToCart = () => {
  handleAddProductToCart(product);
}
  const isLiked = findLike(product, currentUser);
  const handleLikeClick = () => {
    dispatch(getChangedProductLike(product));
  };

  return (
    <div className="card">
      <div className="card_top">
        <div className="card__sticky card__sticky_type_top-left">
          {!!discount && (
            <span className="card__discount">{discount}&nbsp;%</span>
          )}
        </div>
        <div className="card__sticky card__stick_top-right">
          <button
            className={`card__favorite ${
              isLiked ? "card__favorite_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            <Like className="card__liked" />
          </button>
        </div>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures} alt="card__image" className="card__image" />
        <div className="card__desc">
          <span className="card__price">
            <span className="card__price_title">
              {price &&
                (discount > 0 ? (
                  <span className="card_price_wrapper">
                    <span className="card_old_price">{price} ₽</span>
                    <span> {price - changePrice(price, discount)} ₽ </span>
                  </span>
                ) : (
                  <span>{price} ₽</span>
                ))}
            </span>
          </span>
          <p className="card__name">{name}</p>
        </div>
      </Link>
{/* Добавить в корзину */}
        <span
          className={cn("card__cart", {
            ["card__cart_Disabled"]: !product.stock,
          })}
          onClick={() => {
            product.stock
              ? onAddingToCart(product)
              : openNotification("error", "Ошибка", "Извините, товар закончился");
          }}>
          <span>В корзину{" "}</span>
      </span>     
      {!product.stock && <span>Товар закончился</span>}
    </div>
  );
};
