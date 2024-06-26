import { useEffect, useState } from "react";
import { ReactComponent as Star } from "./star.svg";
import cn from "classnames";
import s from './rating.module.css'

export const Rating = ({ rate, setRate, currentRating, isEditable = false }) => {
    // создаем пустые реакт фрагменты, чтобы потом в них положить свг
    const emptyFragments = new Array(5).fill(<></>);
    const [ratingArr, setRatingArr] = useState(emptyFragments);


    const changeDisplay = (rate) => {
        // setRate(rate)
        if (!isEditable) return;
        constructRating(rate);
    }

    const changeRating = (r) => {
        if (!isEditable) return;
        setRate(r);
    }

    const constructRating = (rating) => {
        const updatedArray = ratingArr.map((ratingEl, index) =>
            <Star
                className={cn(s.star, {
                    [s.filled]: index < rating,
                    [s.editable]: isEditable
                })}
                onMouseEnter={() => changeDisplay(index + 1)}
                onMouseLeave={() => changeDisplay(rate)}
                onClick={() => changeRating(index + 1)}
            />);
        setRatingArr(updatedArray);
    }

    useEffect(() => {
        constructRating(rate)
    }, [rate]);

    return (
        <div>
            {ratingArr.map((e, i) => (
                <span key={i}>{e}</span>
            ))}
        </div>
    );
};