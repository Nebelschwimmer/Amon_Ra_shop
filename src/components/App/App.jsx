import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce, findLike } from '../../utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CataloguePage} from '../../pages/CataloguePage/CataloguePage';
import { CardContext } from '../context/card_context';
import { UserContext } from '../context/user_context';
import { HomePage } from '../../pages/HomePage/HomePage';
import { FaqPage } from "../../pages/FAQPage/Faq";
import { FavouritePage } from '../../pages/FavouritePage/FavouritePage';
import { Private } from '../../pages/Private/Private';
import { Modal } from '../Modal/Modal';
import { LogIn } from "../Auth/LogIn/LogIn";
import { Register } from "../Auth/Register/Register";
import { ResetPassword } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from '../../utils/parseJWT';
import { NotAuth } from '../../pages/NotAuth/NotAuth';

function App() {
// Добавление use-state
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


 
  //Объявление функции для фильтрации
  const items_filtered = (products) => products.filter((el) => el.author.name === 'Nebelschwimmer');
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
    return isLiked;
}
  

// Use-effect для поиска
useEffect(() => {
  if (debounceValueInApp === undefined) return;
  handleSearch(debounceValueInApp);
}, [debounceValueInApp]);
// Use-effects для отображения товаров, пользователя, избранного
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
  }, [isAuthenticated]);

  //Объявление useNavigate
const navigate = useNavigate();


  // Use-effect для установления статуса аутентификации пользователя
  useEffect(() => {
    const token = localStorage.getItem('token')
 const uncodedToken = parseJwt(token);
 if (uncodedToken?._id) {
   setIsAuthenticated(true)
 }
}, [navigate]);


  //Объявление функции для сортировки товаров
  const setSortItems = (sort) => {
    
    if (sort === 'Сначала дешевые') {
      const newItems = items.sort((a,b)=> a.price - b.price);
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
// Функция выхода из аккаунта 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsAuthenticated(false)
  }

  //Объявление контекста
  const contextValue = { 
    currentUser, 
    searchQuery, 
    setSearchQuery, 
    setParentCounter, 
    parentCounter, 
    setSort: setSortItems,
    isAuthenticated,
    handleLogout,
    isAdmin,
    setIsAdmin }
  
  const contextCardValue = { 
    items: items, 
    setParentCounter, 
    parentCounter, 
    handleProductLike, 
    favourites,
    setFavourites,
    setItems 
  }
// Маршрутизация при авторизации 
  const authRoutes = <> <Route
    path="login"
    element={
      <Modal activeModal={activeModal} setShowModal={setShowModal}>
        <LogIn setShowModal={setShowModal} />
      </Modal>
    }
  ></Route>
    <Route
      path="register"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <Register setShowModal={setShowModal} />
        </Modal>
      }
    ></Route>
    <Route
      path="reset-password"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <ResetPassword setShowModal={setShowModal} />
        </Modal>
      }
    ></Route></>


  //Тело, навигация
  return (
    <>
    
    <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
    <Header setShowModal={setShowModal}/>   
    {isAuthenticated ? 
    <main className='content container'>
    
        <Routes>      
        <Route path='/'
          element={<HomePage/>}
          >
          </Route>
        <Route
            path='/catalog'
            element={<CataloguePage />  }
      ></Route>
        <Route
        path='/private'
        element={<Private/>}>

        </Route>
        
        <Route path='/product/:productId' 
            element={<ProductPage 
             />}>
        </Route>
        <Route path="faq" element={<FaqPage />}></Route>
        <Route path="favourites" element={<FavouritePage />}></Route>
        {authRoutes}
        <Route path='*' element={
            <div className='error_not_found_title'>Страница не найдена 
            <div className='error_not_found_sad_face'></div>
            <button className='error_not_found_button' 
            onClick={() => navigate('/')}>На главную
            </button>
            </div>}>
        </Route>
        <Route path="not_authenticated" element={<NotAuth />}></Route> 
      </Routes>    
    </main>  
    
    :
    
    
    <div  className="not__auth">Пожалуйста, авторизуйтесь
    
      <button className='not_auth_btn' onClick={()=>{navigate('/login')}}> Вход / Регистрация</button>
      <Routes>
        {authRoutes}
      </Routes>
      </div>
    
}
    <Footer/>
    </CardContext.Provider>
    </UserContext.Provider>      
    </>
  );
}

export default App;
