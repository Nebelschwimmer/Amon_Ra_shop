import logoSrc from './Eye-of-Horus.png';
import './logo_syle.css';

export const Logo = () => {
  return (
    <a href='/'>
      <img src={logoSrc} alt='Company Logo' className='logo-img' />
    </a>
  );
};
