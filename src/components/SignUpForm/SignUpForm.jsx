import { useState } from "react";
import { useForm } from "react-hook-form";

import "./SignupForm.css";

// const handleSubmit = (onSubmit) => {
//     // smth -> data
//     onSubmit(data)
// }

export const SignUpForm = ({ sendData, flag = true }) => {
  const [type, setType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
  };
  const nameRegister = {
    required: {
      value: flag,
      message: "Это поле обязательное",
    },
    minLength: {
      value: 3,
      message: "Слишком короткое имя. Введите минимум 3 символа",
    },
  };


  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Регистрация</h3>
          <input
            type="text"
            {...register("name", nameRegister)}
            placeholder="Введите имя"
            className="form__input"
          />
          {errors?.name && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <input
            type="text"
            {...register("email")}
            placeholder="Введите Ваш e-mail"
            className="form__input"
          />
          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "Необходимо придумать пароль",
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="Пароль"
              className="form__input"
            />
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "Скрыть" : "Показать"}
            </span>
          </div>
          {errors?.password && (
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          )}
          <button type="submit">Зарегистироваться</button>
        </form>
      </div>
    </>
  );
};
