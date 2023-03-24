import './search_style.css';

export const Search = ({ setSearchQuery, searchQuery }) => {
  

  return(
  <input 
  placeholder='Найдите ваш товар' 
  className="search__input"
  onChange={(event) => setSearchQuery(event.target.value)}
  value={searchQuery ?? ''}
  />
  
  )
}
