import './modalDelete.css'
import { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import cn from "classnames";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/card_context';


export const ModalDelete = ({ activeModal, children, setShowModal, id }) => {
 
  const navigate = useNavigate()

  const { setItems } = useContext(CardContext);

  const [product, setProduct] = useState({});
  // const productID = product._id;
  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);
  //Удаление продукта 
  const deleteProduct = async () => {
    try {
      console.log('works');
      await api.deleteProductById(product._id);
      setItems(state => state.filter(e => e._id !== product._id));
      navigate('/catalog');
    } catch (error) {
      console.log('Error deleting');
    }
  };

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
            <button className='delete_modal_btn' onClick={()=>{deleteProduct(product._id);setShowModal(false)}}>Удалить</button>
            <button className='delete_modal_btn' onClick={()=>{setShowModal(false)}} >Отмена</button>
            {children}
            </div>
          </div>
        </div>
      </>
    );
  };
  