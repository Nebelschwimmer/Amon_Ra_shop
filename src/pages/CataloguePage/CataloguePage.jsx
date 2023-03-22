import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../components/context/card_context';
import { SortNav } from '../../components/Sort_nav/SortNav';
import { correctGrammar } from '../../utils/utils';
import { UserContext } from '../../components/context/user_context';
import { useContext, useEffect } from 'react';
import './catalogue.css'
import {useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../utils/utils';
import { api } from '../../utils/api';



export const CataloguePage = () => {
  
  
  

  
  
  
  
  const { items } = useContext(CardContext);
  const { searchQuery, currentUser, isAdmin, setIsAdmin, isAuthenticated} = useContext(UserContext); 
  const itemsLength = items.length
  const navigate = useNavigate();






  // Функция для добавления продукта
  const addProductOnClick = async ()=>{
    await api.addProduct();
   }

   console.log({isAuthenticated})
   const name = currentUser.name;

   useEffect(()=>{
    if (name === 'Nebelschwimmer') 
    {setIsAdmin(true)}
   }
   ,[])
console.log({isAdmin})
   return  (

      <>
     
     { isAdmin ?  <div className='button_add_wrapper'>
     {/* Доработать форму для добавления товара */}
     <button className='button_add' onClick={() => {addProductOnClick(); console.log("Товар добавлен")}}>Добавить товар</button> 
     </div> : ''}
   
     
      <SortNav/>
      {
          searchQuery &&
          (itemsLength > 0 
          ? <div className='search_found'>
            По запросу "{searchQuery}" на сайте: {items?.length}
            {correctGrammar(items.length)}
            </div>
          : <div className='search_not_found'>
            По запросу "{searchQuery}" на сайте не нашлось товаров 
            <div className='error_not_found_sad_face'></div>
            </div>)      
        }
        <CardList items={items}
        />
        <div className='to_home_link_wrapper'>
        <button className='to_home_link_button' onClick={() => {navigate('/'); scrollOnClick()}}>На главную</button>   
        </div>    
  </>
 )
}
