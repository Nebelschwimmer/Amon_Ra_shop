import "./cartSingleProduct.css";
import { changePrice } from "../../../utils/utils";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";



export const CartSingleProduct = ({
pictures, 
name, 
discount, 
price,
id,
quantity,
increaseSingleProductCount,
decreaseSingleProductCount,
removeFromCart
}) => {

const navigate = useNavigate()

// Переменная для подсчета цены продукта с учетом его количества
const totalSingleProductPrice = (price - changePrice(price, discount)) * quantity


return (
<div className='cart_single_product'>
    <div className='cart_single_product_wrapper_left'>
    <img src={pictures} alt='Изображение товара' className='cart_single_product_image'
    onClick={()=>{navigate(`/product/${id}`)}} title="На страницу продукта"/>
        <div className='cart_single_product_name_wrapper'>
            <div className='cart_single_product_name'>{name}</div>
        </div>
    </div>   
    {/*Кнопки для регулирования количества товара, добавляемого в корзину */}
<div className="cart_sing_count_btns_container">
    <div className="cart_sing_count_btns_wrapper">
        {/* Кнопка - */}
        <button
        className="cart_sing_count_minus"
        onClick={() => quantity > 1 &&  decreaseSingleProductCount(id)}
        >-</button>
        {/* Счетчик */}
        <span className="cart_sing_count_number">{quantity}</span>
        {/* Кнопка + */}        
        <button
        className="cart_sing_count_minus"
        onClick={() => increaseSingleProductCount(id)}
        >+</button>
    </div>
</div>
<div className="cart_sing_count_price_container">
    { !!discount 
    ? <div className="cart_sing_price_with_discount_wrapper">
        <span className="cart_sing_price_with_discount">{price} ₽</span> 
        <span className="cart_sing_price_with_no_discount"> {price - changePrice(price, discount)} ₽ </span>
    </div>
    : <span className="cart_sing_price_with_no_discount">{price} ₽</span>    
    }
    {quantity > 1 && <div>Итого: {totalSingleProductPrice} ₽</div>}
</div>
<DeleteOutlineIcon className="cart_delete_icon" onClick={()=>{removeFromCart(id, quantity)}} />
</div>
);
};