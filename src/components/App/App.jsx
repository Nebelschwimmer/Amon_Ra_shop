import React, { useEffect, useState } from 'react';
import { CardList } from '../CardList/CardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import data from '../../data/data.json'
import './App.css';
import {Sort_nav} from '../Sort_nav/Sort_nav';

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect ( () => {
    const stateSearch = data.filter ((element) =>
    element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems( () => [...stateSearch]);
  }, [searchQuery])
  
  const getIssues = (numb) => {
    const tmp = numb % 10;
    if (tmp === 1) return ' товар';
    if (tmp > 1 && tmp < 5) return ' товара';
    if (tmp > 4 || !numb) return ' товаров';
  };
  
  return (
    <div>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    
    <main className='content container'>
      {searchQuery && (
        <p>
        {' '}
        По запросу "{searchQuery}" в продаже: {items.length}
            {getIssues(items.length)} 
      </p>
      )}
    
    <Sort_nav/>
    <CardList items = {items}/>  
    </main>
    <Footer/> 
    </div>
  );
}

export default App;
