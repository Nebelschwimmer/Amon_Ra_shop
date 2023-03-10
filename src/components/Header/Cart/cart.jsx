import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './cart.css'

 
export default function IconCart({ count, clickFunction }) {
   

      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          backgroundColor: 'chocolate',
          color:'white',
         
          padding: '0 4px',
         
        },
      }));
    
  
    return (
    
    <div>
      <IconButton className='icon_button' aria-label='cart'>
        <StyledBadge
         badgeContent={count}>
          <AddShoppingCartIcon className='shopping_cart_icon' fontSize='large' />

        </StyledBadge >
       
      </IconButton>
    </div>
  );
}
