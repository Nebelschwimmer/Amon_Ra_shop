import cn from "classnames";
import { useState } from "react";
import s from "./faq_accordion.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


export const FaqAccordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false);
const navigate = useNavigate('/catalog')
  const toggleState = () => {
    setSelected((state) => !state);
  };
  return (
    <>
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={s.accordionButton} onClick={() => toggleState()}>
    <span className={s.accordionButton} >{'<'}</span>
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
    </>
  );
};
