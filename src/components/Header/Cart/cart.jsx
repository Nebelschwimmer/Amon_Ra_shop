import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './cart.css'
import { red } from '@mui/material/colors';

 
export default function IconCart({ count=0, clickFunction }) {
   

      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          
          border: `1px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
         
        },
      }));
    
  
    return (
    
    <div onClick={()=>clickFunction()}>
      <IconButton className='icon_button' aria-label='cart'>
        <StyledBadge
         badgeContent={count}>
          <AddShoppingCartIcon className='shopping_cart_icon' fontSize='large' />

        </StyledBadge >
       
      </IconButton>
    </div>
  );
}
