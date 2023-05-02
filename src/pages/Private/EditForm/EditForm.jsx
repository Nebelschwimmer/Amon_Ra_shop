import { useForm } from "react-hook-form";
import { EditFormBase } from "./EditFormBase";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../storageToolKit/user/userSlice";

export const EditForm = () => {
const currentUser = useSelector((s) => s.user.data);

const {
register,
handleSubmit,
formState: { errors },
} = useForm({ mode: "onSubmit" });

const dispatch = useDispatch();

const sendProfileData = async (data) => {
await dispatch(updateUser({ name: data.name, about: data.about }));
};

const required = {
required: {
    value: true,
},
};

const sendAvatar = async ({ avatar }) => {
await dispatch(updateUser({ avatar: avatar }));
};

return (
<>
    <EditFormBase
submitForm={handleSubmit(sendProfileData)}
title={"Изменить мои данные"}
>
<div className="private__user_inputs">
    <span className="private_user_span">Имя: </span>
    <input
    className="private_user_input"
    {...register("name", required)}
    defaultValue={currentUser.name}
    type="text"
    placeholder="Введите имя"
    />
    <span className="private_user_span">Дополнительная информация: </span>
    <input
    className="private_user_input"
    defaultValue={currentUser.about}
    {...register("about", required)}
    placeholder="Введите описание"
    /> 
    <button type="submit" className="private_btn_change">
    Отправить
    </button>
</div>
</EditFormBase>
<EditFormBase
submitForm={handleSubmit(sendAvatar)}
title={"Изменить аватар"}
>
<div className="private__user_inputs">
    <span className="private_user_span">Ссылка на аватар: </span>
    <input
    className="private_user_input"
    {...register("avatar")}
    defaultValue={currentUser?.avatar}
    placeholder="URL нового аватара"
    />
    <button className="private_btn_change">Отправить</button>
</div>
</EditFormBase>
</>
);
};
