import { GoodsList } from '../../components/GoodsList/GoodsList';
import { CardContext } from '../../components/context/card_context';
import { SortBar } from '../../components/SortBar/SortBar';
import { correctGrammarSearch } from '../../utils/utils';
import { UserContext } from '../../components/context/user_context';
import { useContext,} from 'react';
import './catalogue.css'
import {useNavigate } from 'react-router-dom';
import { scrollOnClick } from '../../utils/utils';




export const CataloguePage = () => {

  const { items } = useContext(CardContext);
  const { searchQuery} = useContext(UserContext); 
  const navigate = useNavigate();
  console.log({items})
  return  (
      <>
      <SortBar/>
      {
          searchQuery &&
          (items.length > 0 
          ? <div className='search_found'>
            По запросу "{searchQuery}" на сайте: {items?.length}
            {correctGrammarSearch(items.length)}
            </div>
          : <div className='search_not_found'>
            По запросу "{searchQuery}" на сайте не нашлось товаров 
            <div className='error_not_found_sad_face'></div>
            </div>)      
        }
        <GoodsList items={items}/>
        <div className='to_home_link_wrapper'>
        <button className='to_home_link_button' onClick={() => {navigate('/'); scrollOnClick()}}>На главную</button>   
        </div>    
  </>
)
}
