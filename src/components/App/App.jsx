import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce } from '../../utils/utils';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CataloguePage} from '../../pages/CataloguePage/CataloguePage';
import { Categories } from '../Categories/categories';


function App() {
// Добавление use-state
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

 
  //Объявление функции для фильтрации
  const items_filtred = (products, id) => products.filter((e) => e.author._id === id);
 //Объявление функции для поиска
  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => (items_filtred(data, currentUser._id)))
  };
 
// Добавление use-debounce
  const debounceValueInApp = useDebounce(searchQuery, 500);

  //Добавление и удаление лайка
   function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id);
    isLiked 
    ? api.deleteLike(product._id).then((newItem)=>{
        const newItems = items.map((el)=> el._id === newItem._id ? newItem : el);
        setItems(items_filtred(newItems, currentUser._id));
    })
    : api.addLike(product._id).then((newItem)=>{
      const newItems = items.map((el)=> el._id === newItem._id ? newItem : el);
      setItems(items_filtred(newItems, currentUser._id));
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
        setItems(items_filtred(productData.products, userData._id));
      }
    );
  }, []);
  console.log(currentUser)
  

  //Тело
  return (
    <div>
    <Header 
        user={currentUser}
        parentCounter={parentCounter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} />
    
    <main className='content container'>
     
      <Routes>
          <Route
            path='/'
            element={
              <CataloguePage
                searchQuery={searchQuery}
                items={items}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
                setParentCounter={setParentCounter}
              />
            }

          ></Route>
          <Route path='/product/:productId' element={<ProductPage currentUser={currentUser} />}>
          </Route>
        </Routes> 
    
    </main>
    
    <Footer/> 
    </div>
  );
}

export default App;
