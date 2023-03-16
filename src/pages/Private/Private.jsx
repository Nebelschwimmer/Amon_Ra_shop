import './private.css'
import { useContext } from 'react';
import { UserContext } from '../../components/context/user_context';




export const Private = () => {
    const {currentUser} = useContext(UserContext);
return (
<div>
   <div className='private_container'>
        <div className='private_title'>
            <h1>Личный кабинет</h1>
        </div>
        
            <div className='private_image_info'>
                <div className='private_image_wrapper'>
                    <img className='private_image' src={currentUser.avatar}/>    
                </div>      
                
                <div className='private_user_info'>
                <span className='private_user_data'>Данные пользователя</span>
                    <div className='private_user_info_item_wrapper'>
                        <span className='private_user_info_title' >Ваше имя: </span>
                        <span ><input className='private_user_info_input' value={currentUser.name}></input></span>
                    </div>

                    <div className='private_user_info_item_wrapper'>
                        <span className='private_user_info_title' >Электронная почта: </span>
                        <span ><input className='private_user_info_input' value={currentUser.email}></input></span>
                    </div>


                    <div className='private_user_info_item_wrapper'>
                        <span className='private_user_info_title' >Дополнительная информация: </span>
                        <span ><input className='private_user_info_input' value={currentUser.about}></input></span>
                    </div>

                </div>
    
        </div>
    </div>


</div>

    
)
}