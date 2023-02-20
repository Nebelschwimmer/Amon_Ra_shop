import { Card } from '../Card/Card';
import './index.css';

export const CardList = ({  currentUser,
  items,
  setParentCounter,
  handleProductLike, }) => {
  
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