import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './cart.css'

 
export default function IconCart({ count, clickFunction }) {
   

      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -1,
          backgroundColor: 'chocolate',
          color:'white',
          top: 3,
          fontSize: '12px',
          width: '20px',
          height: '20px',
          padding: '0 4px',
          opacity: 0.7,
          textAlign: 'center'
         
        },
      }));
    
  
    return (
    
    <div>
      <IconButton className='icon_button' aria-label='cart' title="Корзина">
        <StyledBadge
         badgeContent={count}>
          <AddShoppingCartIcon className='shopping_cart_icon' fontSize='large'  />

        </StyledBadge >
       
      </IconButton>
    </div>
  );
}
