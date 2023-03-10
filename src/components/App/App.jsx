import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce, findLike } from '../../utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CataloguePage} from '../../pages/CataloguePage/CataloguePage';
import { Categories } from '../Categories/categories';
import { CardContext } from '../context/card_context';
import { UserContext } from '../context/user_context';
import { HomePage } from '../../pages/HomePage/HomePage';
import { FaqPage } from "../../pages/FAQPage/Faq";
import { FavouritePage } from '../../pages/FavouritePage/FavouritePage';


function App() {
// Добавление use-state
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [activeModal, setShowModal] = useState(false);

 
  //Объявление функции для фильтрации
  const items_filtered = (products, id) => products.filter((el) => el.author._id === id);
 //Объявление функции для поиска
  const handleSearch = (search) => {
    api.searchProducts(search)
    .then((data) => setItems(items_filtered(data, currentUser._id)))
  };
  
 
// Добавление use-debounce
  const debounceValueInApp = useDebounce(searchQuery, 500);

  //Добавление и удаление лайка
   function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    isLiked 
    ? api.deleteLike(product._id).then((newItem)=>{
        const newItems = items.map((el)=> el._id === newItem._id ? newItem : el);
        setItems(items_filtered(newItems, currentUser._id));
        setFavourites((state) => state.filter((f) => f._id !== newItem._id))
    })
    : api.addLike(product._id).then((newItem)=>{
      const newItems = items.map((el)=> el._id === newItem._id ? newItem : el);
      setItems(items_filtered(newItems, currentUser._id));
      setFavourites((favor) => [...favor, newItem]);
    });
  
}
  

// Use-effects
useEffect(() => {
  if (debounceValueInApp === undefined) return;
  handleSearch(debounceValueInApp);
}, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        const itemsFiltered = items_filtered(productData.products, userData._id);
        setItems(itemsFiltered);
        const fav = itemsFiltered.filter((e) => findLike(e, userData));
        setFavourites(fav)
      }
    );
  }, []);
//Объявление useNavigate
  const navigate = useNavigate();
//Объявление функции для сортировки товаров
  const setSortItems = (sort) => {
    
    if (sort === 'Сначала дешевые') {
      const newItems= items.sort((a,b)=> a.price - b.price);
      setItems([...newItems]);
    }
    if (sort === 'Сначала дорогие') {
      const newItems = items.sort((a,b)=> b.price - a.price);
      setItems([...newItems]);
    }
    if (sort === 'Популярные') {
      const newItems = items.sort((a,b)=> b.likes.length - a.likes.length);
      setItems([...newItems]);
    }
    if (sort === 'Новинки') {
      const newItems = items.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
      setItems([...newItems]);
    }
    if (sort === 'По скидке') {
      const newItems = items.sort((a,b)=> b.discount - a.discount);
      setItems([...newItems]);
    }
  }
  //Объявление контекста
  const contextValue = { 
    
    currentUser, 
    searchQuery, 
    setSearchQuery, 
    setParentCounter, 
    parentCounter, 
    setSort: setSortItems }
  
  const contextCardValue = { 
    items: items, 
    setParentCounter, 
    parentCounter, 
    handleProductLike, 
    favourites,
    setFavourites, 
  }



  //Тело, навигация
  return (
    <>
    <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
    <Header 
       
        
        />
   
   

     
    
    <main className='content container'>
        <Routes>      
        <Route path="/"
          element={<HomePage/>
        }
          >
          </Route>
        <Route
            path='/catalog'
            element={<CataloguePage />  }
      ></Route>
        <Route path='/product/:productId' 
            element={<ProductPage 
            currentUser={currentUser} 
            setParentCounter={setParentCounter}
            handleProductLike={handleProductLike} />}>
        </Route>
        <Route path="faq" element={<FaqPage />}></Route>
        <Route path="favourites" element={<FavouritePage />}></Route>
        <Route path='*' element={
            <div className='error_not_found_title'>Страница не найдена 
            <div className='error_not_found_sad_face'></div>
            <button className='error_not_found_button' 
            onClick={() => navigate('/')}>На главную
            </button>
            </div>}>
        </Route> 
      </Routes>    
    </main>  
    <Footer/>
    </CardContext.Provider>
    </UserContext.Provider>      
    </>
  );
}

export default App;
