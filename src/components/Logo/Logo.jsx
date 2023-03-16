import logoSrc from './Eye-of-Horus.png';
import './logo_style.css';

export const Logo = () => {
  return (
    <a  href='/' title="На главную">
      <img src={logoSrc} alt='Company Logo' className='logo-img' />
    </a>
  );
};
