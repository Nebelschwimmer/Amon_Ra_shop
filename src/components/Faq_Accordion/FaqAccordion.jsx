import cn from "classnames";
import { useState } from "react";
import s from "./faq_accordion.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export const Faq_Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false);

  const toggleState = () => {
    setSelected((state) => !state);
  };
  return (
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={s.accordionButton} onClick={() => toggleState()}>
     <ArrowBackIosIcon className={s.accordionButton} ></ArrowBackIosIcon>
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
  );
};
