import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { ModalSignUp } from '../../Modals/ModalSignUp/ModalSignUp';
import { SignUpForm } from '../../SignUpForm/SignUpForm';
import { useState } from 'react';
import { api } from '../../../utils/api';

export default function IconLogin() {  
  
  const [activeModal, setShowModal] = useState(false);
  const sendData = async (data) => {
    const result = await api.signUpUser({ ...data, group: "group-10" });
    console.log({ result });
  };
 
  
  return ( 
  <div title="Войти">
     <ModalSignUp activeModal={activeModal} setShowModal={setShowModal}>
  <SignUpForm sendData={sendData} />
</ModalSignUp>
    
    <IconButton className='icon_button' aria-label='Войти' onClick={() => setShowModal(true)}>
        <LoginRoundedIcon className='login_button' fontSize='large' />
    </IconButton>
  </div>
);
}

