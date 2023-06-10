import { useEffect, useState } from "react";

//Функция для корректировки грамматики в ответе на поисковой запрос
export const correctGrammarSearch = (number) => {
  const query_number = number % 10;
  if (query_number === 1) return ' товар';
  if (query_number > 1 && query_number < 5) return ' товара';
  if (query_number > 4 || !query_number) return ' товаров';
};
//Функция для корректировки грамматики в отображении кол-ва отзывов
export const correctGrammarReviews = (number) => {
  const query_number = number % 10;
  if (query_number === 1) return 'отзыв';
  if (query_number > 1 && query_number < 5) return ' отзыва';
  if (query_number > 4 || !query_number) return ' отзывов';
};

//Функция для отсрочки апи-запроса для поиска
export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);
    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};

//Функция для поиска наличия лайков
export const findLike = (product, currentUser) =>
  product?.likes?.some((el) => el === currentUser._id);

//Функция для скролла
  export  const scrollOnClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
};  
//Функция для изменения цены при наличии скидки
export const changePrice = (oldprice, discount) => {
  const newPrice = Math.round((discount / 100) * oldprice);
  return newPrice
  
}
