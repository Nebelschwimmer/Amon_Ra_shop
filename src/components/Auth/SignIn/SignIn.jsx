import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { pattern } from "../../../utils/validations";
import { BaseButton } from "../../BaseButton/BaseButton";
import { BaseForm } from "../../BaseForm/BaseForm";
import "../auth_style.css";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { openNotification } from "../../Notification/Notification";

export const SignIn = ({ setShowModal }) => {
  // useState для типа отображения пароля
  const [type, setType] = useState(false);
  
  // Создание формы
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  
  // useNavigate
  const navigate = useNavigate();
  
  // Фукнция для навигации по клику
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  // Функция для отправки данных
  const sendData = async (data) => {
    try {
      const res = await authApi.signIn(data);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      openNotification("error", "Ошибка", "Неправильный логин или пароль");
    }
  };
  // Register для email
  const emailRegister = register("email", {
    required: "E-mail обязателен",
  });
  // Register для пароля
  const passwordRegister = register("password", {
    required: "Пароль обязателен",
    pattern,
  });

  // useEffect для отображения модального окна
  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  // Верстка
  return (
    <>
      <div className="form_close_butn_wrapper">
        <button
          className="form_close_btn"
          title="Закрыть"
          onClick={() => {
            setShowModal(false);
            navigate("/not_authenticated");
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <BaseForm submitForm={handleSubmit(sendData)} title={"Вход"}>
        <div className="auth__controls">
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          />
          {errors?.email && (
            <span className="auth__warning">{errors.email?.message}</span>
          )}
          <input
            type={type ? "text" : "password"}
            {...passwordRegister}
            placeholder="Пароль"
            className="auth__input"
          />
          {errors?.password && (
            <span className="auth__warning">{errors.password?.message}</span>
          )}
          {!errors?.password && (
            <span className="auth__eye_register" onClick={() => setType(!type)}>
              {type ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          )}

          <span
            className="auth__info auth__link"
            onClick={() => navigate("/change-password")}
          >
            Восстановить пароль
          </span>

          <div className="auth__actions">
            <BaseButton type="submit" color={"yellow"}>
              <span>Войти</span>
            </BaseButton>
            <BaseButton onClick={handleClick} color={"white"}>
              <span>Регистрация</span>
            </BaseButton>
          </div>
        </div>
      </BaseForm>
    </>
  );
};
