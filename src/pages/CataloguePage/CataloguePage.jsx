import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../components/context/card_context';
import { Sort_nav } from '../../components/Sort_nav/Sort_nav';
import { correctGrammar } from '../../utils/utils';
import { UserContext } from '../../components/context/user_context';
import { useContext } from 'react';
import './catalogue.css'
import {useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../utils/utils';

export const CataloguePage = () => {
  const { items } = useContext(CardContext);
  const { searchQuery} = useContext(UserContext); 
  const itemsLength = items.length
  const navigate = useNavigate();

 return <>
      <Sort_nav/>
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
}
