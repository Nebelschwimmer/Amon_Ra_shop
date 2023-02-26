import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../utils/api";

export const ProductPage = ({currentUser, handleProductLike, setParentCounter}) => {

  const id = useParams();
  const [product, setProduct] = useState(null);

  console.log(id);
  useEffect(() => {
    if (!id.productId) return;
    api.getProductById(id.productId).then((data) => setProduct(data));
  }, [id?.productId]);

  console.log(id);

  return (
    <>
      {product && (
        <Product
          currentUser={currentUser}
          id={id.productId}
          handleProductLike={handleProductLike}
          setParentCounter={setParentCounter}
          product={product}
          setProduct={setProduct}
        />
      )}
    </>
  );
};