import "./private.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditForm } from "./EditForm/EditForm";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Popup } from "../../components/Popup/Popup";
import { UserContext } from "../../components/context/user_context";
import { useContext } from "react";
import BackButton from "../../components/Product/Back_Button/back_button";

export const Private = () => {
  // Стейты для показа формы и модального окна
  const [showForm, setShowForm] = useState(false);
  const [activeModal, setShowModal] = useState(false);
  // Селектор для пользователя
  const currentUser = useSelector(s => s.user.data)
  // Для навигации в корзину
  const navigate = useNavigate()
  // Функция для выхода из контекста
  const {handleLogout} = useContext(UserContext)
  
  return (
    <div>
      <BackButton></BackButton>
      <div className="private_container">
        <div className="private_title">
          <h1>Личный кабинет</h1>
        </div>
        {/* Аватар */}
        
        <div className="private_image_info">
          <div className="private_image_wrapper">
            <img className="private_image" src={currentUser.avatar} alt="Изображение отсутствует" onClick={()=>{setShowModal(true)}} />
          <Popup activeModal={activeModal} setShowModal={setShowModal}>
            <div className="private_avatar_modal">
              <img className="private_avatar_modal_image" src={currentUser.avatar} alt="Изображение отсутствует"/>
            </div>
          </Popup>
          </div>
        
        {/* Сетка с данными */}
        <div className="private_user_info">
          <div className="private_user_data_wrapper">
              <span className="private_user_data">Данные пользователя</span>
          </div>
          <div className="info_grid">
            <div className="private_user_info_titles_container">
              <span className="private_user_info_title">Ваше имя: </span>
              <span className="private_user_info_title">
                  Электронная почта:
              </span>
              <span className="private_user_info_title">
                Дополнительная информация:
              </span>
            </div>
            <div className="private_user_info_inputs_container">
              <span className="private_input_icon">{currentUser.name}</span>
              <span className="private_input_icon">{currentUser.email}</span>
              <span className="private_input_icon">{currentUser.about}</span>
            </div>
          </div>
            {/* Кнопки */}
            <div className="private_buttons">
              {/* Кнопка для показа формы для изменения данных */}
              <button
                className="private_btn_change"
                onClick={() => setShowForm(true)}
              >
                Изменить данные
              </button>
               {/* Кнопка для выхода из аккаунта */}
              <button
                className="private_btn_change"
                onClick={handleLogout}
              >
                Выйти
              </button>
              
              {/* Кнопка для корзины */}
              <button
                className="private_btn_change"
                onClick={() => navigate('/cart')}
              >
                Корзина
              </button>

            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="edit_form_wrapper">
          <span className="private_close_icon_wrapper">
            <button
              className="private_close_form_button"
              onClick={() => {
                setShowForm(false);
              }}
            >
              <CloseIcon style={{ fontSize: "17px" }} />
            </button>
          </span>
          <div className="edit_form_wrapper_grid" >
          <EditForm></EditForm>
          </div>
        </div>
      )}
    </div>
  );
};
