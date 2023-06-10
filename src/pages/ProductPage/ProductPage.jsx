import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useContext } from 'react';
import { CardContext } from '../../components/context/card_context';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { getChangedProductLike } from "../../storageToolKit/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { findLike } from "../../utils/utils";


export const ProductPage = () => {
// Объявление стейтов
  const [reviews, setReviews] = useState([]);



  const [product, setProduct] = useState(null);

  // useParams
  const id = useParams();
  // Вывод из контекста карточки
  const {setToCartCounter, setItems, items} = useContext(CardContext)
  // Объявление функции-диспетчера
  const dispatch = useDispatch();
  // Объявление currentUser с помощью селектора
  const currentUser = useSelector(({ user }) => user.data);
  
  // Функция, срабатывающая при нажатии кнопки лайка
  const onProductLike = () => {
    const wasLiked = findLike(product, currentUser);
    dispatch(getChangedProductLike(product))
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
      setProduct({ ...product, likes: filteredLikes });
    } else {
      const addedLikes = [...product.likes, currentUser._id];
      setProduct({ ...product, likes: addedLikes });
    }
  };

  // Функция, которая сетит обновленный продукт после отправки отзыва
  const onSendReview = (newProduct) => {
    setProduct(()=>({ ...newProduct }));
  }
 // Функция для удаления отзыва, сетит обновленный продукт после удаления отзыва
  const deleteReview = async (id) => {
    const result = await api.deleteReview(product._id, id);
    setProduct((state) => ({ ...result }));
    return result;
  };
// Функция, срабатывающая при обновлении продукта, сетит обновленный продукт на его странице и в каталоге
  const onUpdateProduct = (newProduct) => {
    setProduct(()=>({ ...newProduct}));
    const newItems = items.map((e) =>  {
      if (e._id === newProduct._id) {
        return newProduct
      }
      return e
    });
    setItems([...newItems]);
  }

// useEffect для отображения продукта по id
  useEffect(() => {
    if (!id?.productId) {
      return
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);

  useEffect(() => {
    if (product?.reviews && Array.isArray(product?.reviews)) {
      setReviews(() => [
        ...product.reviews?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
    }
  }, [product]);



  return (
    <>
      
      {product && currentUser ? (
        <Product
          product={product}
          reviews={reviews}
          onDeleteReview={deleteReview}
          onSendReview={onSendReview}
          onUpdateProduct={onUpdateProduct}
          id={id.productId}
          onProductLike={onProductLike}
          currentUser={currentUser}
          setToCartCounter={setToCartCounter}
        />
      ) : (
        <div>Загрузка</div>
      )}
    </>
  );
};
