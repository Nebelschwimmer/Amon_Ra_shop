import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../utils/api";


export const ProductPage = ({currentUser, setParentCounter}) => {

  const id = useParams();

  return <Product  id={id.productId} currentUser={currentUser} setParentCounter={setParentCounter} />
  
};
