import './sideBar.css'


export const SideBar = () =>
{
      //Функция для кнопки добавления нового товара
  
//    const changeUserInfoOnClick = async ()=>{
//      await api.changeUserInfo()
//     }  
//    const changeUserAvatarOnClick = async ()=>{
//      await api.changeUserAvatar()  
//    }
    return(
        <div >
        <div className='sideBar_wrapper'>  
                    <p>От партнеров</p> 
            <div className='sideBar_container'>
                <a href="https://kochevnik.kg/selections/egipet/" target="_blank">
                    <img className='sideBar_image' src='https://kochevnik.kg/wp-content/uploads/2018/01/egipetbanner18013.jpg'/>
                </a>
                <a href="https://travelbelka.ru/tury-v-egipet-ot-14600-oteli-5-vse-vklyucheno/" target="_blank">
                    <img className='sideBar_image' src='https://travelbelka.ru/wp-content/uploads/2022/01/EG14600ALL.png'/>
                </a>
            </div>
        </div> 
        </div> 
    )

}