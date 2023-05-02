import { useEffect, useState } from "react";
import { ReactComponent as Star } from "./star.svg";
import cn from "classnames";
import s from "./rating.module.css";

export const Rating = ({ rate, setRate, isEditable = false }) => {
const emptyTags = new Array(5).fill(<></>);
const [ratingArray, setRatingArray] = useState(emptyTags);

const changeRatingDisplay = (rate) => {
    if (!isEditable) return;
    buildRating(rate);
};

const changeRating = (r) => {
    if (!isEditable) return;
    setRate(r);
};

const buildRating = (rating) => {
    const updatedRatingArray = ratingArray.map((ratingEl, index) => (
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

useEffect(() => {
  buildRating(rate);
}, [rate]);

return (
    <div>
    {ratingArray.map((e, i) => (
        <span key={i}>{e}</span>
    ))}
    </div>
);
};
