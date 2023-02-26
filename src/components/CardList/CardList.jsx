import { Card } from '../Card/Card';
import './index.css';
import { CardContext } from '../context/card_context'; 
import { useContext } from 'react';

export const CardList = () => {

  const { items, currentUser, setParentCounter, handleProductLike } = useContext(CardContext)
  
  return (
    <div className='cards'>
      {items.map((element) => {
       
        return <Card 
        {...element} 
        key={element._id} 
        currentUser={currentUser}
        product={element}
        onProductLike={handleProductLike}
        setParentCounter={setParentCounter}
        />;
      })}
    </div>
  );
};