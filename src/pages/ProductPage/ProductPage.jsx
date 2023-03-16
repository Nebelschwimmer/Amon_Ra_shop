import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useContext } from 'react';
import { CardContext } from '../../components/context/card_context';

export const ProductPage = ({currentUser}) => {

  const id = useParams();
  const {setParentCounter, handleProductLike } = useContext(CardContext)
  return <Product  id={id.productId} currentUser={currentUser} setParentCounter={setParentCounter} onProductLike={handleProductLike}  />
  
};
