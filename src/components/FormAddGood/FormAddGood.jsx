import { useForm } from "react-hook-form";
import "./form_add_good.css";
import { api } from "../../utils/api";
import { openNotification } from "../Notification/Notification";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../context/card_context";
import { EditProductBaseForm } from "../Product/EditProductForm/EditProductBaseForm";

export const FormAddGood = ({ setCreateModal }) => {

const navigate = useNavigate();
const { items, setItems } = useContext(CardContext);

// Создание формы
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({ mode: "onSubmit" });

// Функция для отправки формы
const addGood = async (data) => {
try {
    const result = await api.addProduct({ ...data });
    navigate("/catalog");
    setItems([...items, result]);
    setCreateModal(false);
    openNotification("success", "Успешно", "Товар успешно добавлен");
} catch (error) {
    openNotification("error", "Ошибка", "Товар добавить не удалось");
    console.log({ error });
}
};
// Верстка
return (
<div className="add_product_container">
    {/* Кнопка закрытия */}
    <div className="add_good_close_icon_wrapper">
    <span
        className="add_good_close_icon"
        onClick={() => {
        setCreateModal(false);
        }}
    >
        <CloseIcon style={{ fontSize: "18px" }} />
    </span>
    </div>
    {/* Форма */}
    <div>
    <EditProductBaseForm
        title={"Добавить товар"}
        submitForm={handleSubmit(addGood)}
    >
        {/* Основные инпуты */}
        <div className="edit_input_wrapper">
          <span className="edit_input_title">Название</span>
          <input
              type="text"
              className="edit_form_input"
              placeholder="Название"
              {...register("name", { required: 'Введите название'})}
        />
          {errors?.name && (
          <span className="auth__warning">{errors.name?.message}</span>
          )}
        </div>
        <div className="edit_input_wrapper">
          <span className="edit_input_title">Цена</span>
          <input
              type="number"
              min="0"
              className="edit_form_input"
              placeholder="Цена"
              {...register("price", { required: 'Введите цену' })}
          />
          {errors?.price && (
          <span className="auth__warning">{errors.price?.message}</span>
          )}
        </div>
        <div className="edit_input_wrapper">
          <span className="edit_input_title">Вес</span>
          <input
              type="text"
              className="edit_form_input"
              placeholder="Вес"
              {...register("wight", { required: 'Введите вес '})}
          />
          {errors?.wight && (
          <span className="auth__warning">{errors.wight?.message}</span>
          )}
        </div>
        <div className="edit_input_wrapper">
          <span className="edit_input_title">URL изображения</span>
          <input
              type="text"
              className="edit_form_input"
              placeholder="URL изображения"
              {...register("pictures", { required: 'Введите URL изображения' })}
          />
        {errors?.pictures && (
        <span className="auth__warning">{errors.pictures?.message}</span>
        )}
        </div>
        <div className="edit_input_wrapper">
        <span className="edit_input_title">Скидка</span>
        <input
            type="number"
            min="0"
            max="99"
            className="edit_form_input"
            defaultValue={0}
            placeholder="Скидка"
            {...register("discount", { required: false })}
        />
        </div>
        <div className="edit_input_wrapper">
        <span className="edit_input_title">Количество на складе</span>
        <input
            type="number"
            min="0"
            defaultValue={1}
            className="edit_form_input"
            placeholder="Количество товара на складе"
            {...register("stock", { required: false })}
        />
        </div>
        <div className="edit_input_wrapper">
        <span className="edit_input_title">Описание</span>
        <textarea
            className="edit_form_textarea"
            placeholder="Описание"
            {...register("description", { required: 'Введите описание' })}
        />
        {errors?.description && (
        <span className="auth__warning">{errors.description?.message}</span>
        )}
        </div>
        {/* Кнопка для отправки формы */}
        <button className="edit_btn_submit" type="submit">
        Отправить
        </button>
    </EditProductBaseForm>
    </div>
</div>
);
};
