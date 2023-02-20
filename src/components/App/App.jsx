import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce } from '../../utils/utils';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CataloguePage} from '../../pages/CataloguePage/CataloguePage';


function App() {
// Добавление use-state
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setItems([...data]))
  };
//  const items_filtred = (products, id) => products.filter((e) => e.author._id === id);
// Добавление use-debounce
  const debounceValueInApp = useDebounce(searchQuery, 500);

  //Добавление и удаление лайка
   function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id);
    isLiked 
    ? api.deleteLike(product._id).then((newItem)=>{
        const newItems = items.map((e)=> e._id === newItem._id ? newItem : e);
        setItems([...newItems]);
    })
    : api.addLike(product._id).then((newItem)=>{
      const newItems = items.map((e)=> e._id === newItem._id ? newItem : e);
      setItems([...newItems]);
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
        
        setItems(productData.products)
      }
    );
  }, []);

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
