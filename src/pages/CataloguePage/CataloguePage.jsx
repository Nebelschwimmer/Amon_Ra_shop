import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../components/context/card_context';
import { Sort_nav } from '../../components/Sort_nav/Sort_nav';
import { getIssues } from '../../utils/utils';
import { UserContext } from '../../components/context/user_context';
import { useContext } from 'react';
import './catalogue.css'
import { Route, Routes, useNavigate } from 'react-router-dom';

export const CataloguePage = () => {
  const { items } = useContext(CardContext);
  const { searchQuery, setSort } = useContext(UserContext); 
  const itemsLength = items.length
  const navigate = useNavigate();

 return <>
      <Sort_nav/>
      {
          searchQuery &&
          (itemsLength > 0 
          ? <p className='search_found'>
            По запросу "{searchQuery}" на сайте: {items?.length}
            {getIssues(items.length)}
            </p>
          : <p className='search_not_found'>
            По запросу "{searchQuery}" на сайте не нашлось товаров 
            <div className='error_not_found_sad_face'></div>
            </p>)      
        }
        <CardList
        />
        <button className='to_home_link_button' onClick={() => navigate('/')}>На главную</button> 
        {/* <button className='error_not_found_button' 
                onClick={() => navigate('/')}>На главную
                </button> */}
  </>
}
