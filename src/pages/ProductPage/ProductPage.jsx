import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useContext } from 'react';
import { CardContext } from '../../components/context/card_context';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { UserContext } from '../../components/context/user_context';

export const ProductPage = () => {

  const id = useParams();
  const [product, setProduct] = useState(null);
  const {setParentCounter, handleProductLike } = useContext(CardContext)

  const { currentUser } = useContext(UserContext);
  
  
  const onProductLike = () => {

  const wasLiked = handleProductLike(product);
    console.log({ wasLiked });
    if (wasLiked) {
      const filteredLikes = product.likes.filter(e => e !== currentUser._id);
      console.log(filteredLikes);
      setProduct({ ...product, likes: filteredLikes });
    } else {
      const addedLikes = [...product.likes, currentUser._id];
      setProduct({ ...product, likes: addedLikes });
    }
  }
  
  const onSendReview = (newProduct) => {
    setProduct(()=>({ ...newProduct }));
  }
  useEffect(() => {
    if (!id?.productId) {
      return
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);
  return product && currentUser ? <Product product={product}  currentUser={currentUser} id={id.productId} onSendReview={onSendReview} onProductLike={onProductLike} setParentCounter={setParentCounter} /> : <div>Загрузка</div>
  
};
