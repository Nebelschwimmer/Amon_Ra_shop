import './categories.css';
export const Categories = ({}) => {

    return (
    <ul className='categories_container'>Категории товаров
        <li className = 'categories_item' id = "statuettes">Статуэтки  </li>
        <li className = 'categories_item' id = "papyruses"> Декоративные папирусы </li>
        <li className = 'categories_item' id = "books"> Аксессуары </li>
        <li className = 'categories_item' id = "amulets"> Книги</li>
        <li className = 'categories_item' id = "clothes"> Амулеты </li>
        <li className = 'categories_item' id = "accessories"> Одежда </li>
    </ul>   
    );
  };