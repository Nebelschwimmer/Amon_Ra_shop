import { useEffect, useState } from "react";
import { ReactComponent as Star } from "./star.svg";
import cn from "classnames";
import s from "./rating.module.css";

export const Rating = ({ rate, setRate, isEditable = false }) => {
// Создание пустого массива длинной в 5 элементов
const emptyTags = new Array(5).fill(<></>);
// Стейт для массива рейтинга; изначальное значение - пустой массив emptyTags
const [ratingArray, setRatingArray] = useState(emptyTags);
// Функция для изменения рейтинга при наведению мышью
const changeRatingDisplay = (rate) => {
    if (!isEditable) return;
    buildRating(rate);
};
// Функция для изменения рейтинга на клик
const changeRating = (r) => {
    if (!isEditable) return;
    setRate(r);
};
// Функция построения рейтинга
const buildRating = (rating) => {
  // "Размпамиваем" массив, который имеется в стейте  ratingArray, далее "сетим его"
  const updatedRatingArray = ratingArray.map((el, index) => (
    <Star
        className={cn(s.star, {
        [s.filled]: index < rating,
        [s.editable]: isEditable,
        })}
        onMouseEnter={() => changeRatingDisplay(index + 1)}
        onMouseLeave={() => changeRatingDisplay(rate)}
        onClick={() => changeRating(index + 1)}
    />
    ));
    setRatingArray(updatedRatingArray);
};
// Use-effect для слежения за стейтом rate
useEffect(() => {
  buildRating(rate);
}, [rate]);
// Весртка
return (
    <div>
    {ratingArray.map((el, index) => (
        <span key={index}>{el}</span>
    ))}
    </div>
);
};
