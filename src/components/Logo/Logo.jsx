import { useNavigate } from 'react-router-dom';
import logoSrc from './Eye-of-Horus.png';
import './logo_style.css';

export const Logo = () => {
 const navigate = useNavigate()
  return (
    <div className='logo_wrapper' onClick={()=>{navigate('/catalog')}} title="В каталог">
      <img src={logoSrc} alt='Company Logo' className='logo-img' />
    </div>
  );
};
