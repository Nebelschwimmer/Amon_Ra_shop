import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../utils/api";

export const ProductPage = ({currentUser, handleProductLike, setParentCounter}) => {

  const id = useParams();

  console.log(id);


  return <Product  id={id.productId} />;
};