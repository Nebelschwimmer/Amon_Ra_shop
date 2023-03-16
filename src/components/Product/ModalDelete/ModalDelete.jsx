import './modalDelete.css'
import { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import cn from "classnames";
import { useNavigate } from 'react-router-dom';




export const ModalDelete = ({ activeModal, children, setShowModal, id }) => {
 
  const navigate = useNavigate()

  const [product, setProduct] = useState({});
  const productID = product._id;
       //Удаление продукта 
       const deleteProduct = async () => {
        await api.deleteProductById(productID);
      };
      useEffect(() => {
        api.getProductById(id).then((data) => setProduct(data));
      }, [id]);

    

  
  return (
      <>
        
        <div
        
          className={cn("modal", { ["active"]: activeModal })}
          onClick={() => setShowModal(false)}
        >

          <div
            className={cn("delete_modal_content", { ["active"]: activeModal })}
            onClick={(e) => e.stopPropagation()}
          >
            
            <h2>Подтвердите удаление</h2>
            <div className='delete_modal_btns_container'>
            <button className='delete_modal_btn' onClick={()=>{deleteProduct(productID);setShowModal(false)}}>Удалить</button>
            <button className='delete_modal_btn' onClick={()=>{setShowModal(false)}} >Отмена</button>
            {children}
            </div>
          </div>
        </div>
      </>
    );
  };
  