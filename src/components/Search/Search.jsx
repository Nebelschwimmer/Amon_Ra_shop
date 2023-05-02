import { useNavigate } from 'react-router-dom';
import './search_style.css';

export const Search = ({ setSearchQuery, searchQuery }) => {
  const navigate = useNavigate()
  return(
  <input 
    placeholder='Найдите ваш товар' 
    className="search__input"
    onChange={(event) => {setSearchQuery(event.target.value); navigate('/catalog')}}
    value={searchQuery ?? ''}
  />
  )
}
