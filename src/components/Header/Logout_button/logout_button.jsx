import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';


export default function IconLogout() {  
    return ( 
    <div>
      <IconButton className='icon_button' aria-label='cart'>
          <LogoutRoundedIcon className='login_button' fontSize='large' />
      </IconButton>
    </div>
  );
  }
