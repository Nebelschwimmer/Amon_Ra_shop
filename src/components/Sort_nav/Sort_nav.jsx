import './Sort_nav.css';
export const Sort_nav = ({}) => {

    return (
    <div className='sort_nav' id='sort'>
        <div className = 'sort_item' id = "popular"> Популярные </div>
        <div className = 'sort_item' id = "new"> Новинки </div>
        <div className = 'sort_item' id = "first_cheap"> Сначала дешёвые </div>
        <div className = 'sort_item' id = "first_expensive"> Сначала дорогие </div>
        <div className = 'sort_item' id = "rating"> По рейтингу </div>
        <div className = 'sort_item' id = "discount"> По скидке </div>
    </div>
    );
  };