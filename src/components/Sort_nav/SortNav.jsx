import './Sort_nav.css';
import { UserContext } from '../context/user_context';
import { useContext } from 'react';

export const SortNav = () => {

    const items_sorted = [{ id: 'Популярные' },  { id: 'Новинки' }, { id: 'Сначала дешевые' }, { id: 'Сначала дорогие' }, { id: 'По скидке' }]
    const { setSort } = useContext(UserContext);
    return (
        <div className='sort_nav'>
        {items_sorted.map((e) =>
          <span key={e.id} className='sort_item' onClick={() => setSort(e.id)}>{e.id}</span>
        )}
      </div>
    );
  };