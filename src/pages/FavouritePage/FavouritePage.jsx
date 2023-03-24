import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList/CardList";
import { CardContext } from "../../components/context/card_context";
import "./favourites.css";
import  BackButton  from '../../components/Product/Back_Button/back_button';

export const FavouritePage = () => {
  const { favourites } = useContext(CardContext);

  const navigate = useNavigate();

  return (
    <div className="favourites">
      <span className="favourites__back" >
       <BackButton onClick={() => navigate(-1)}/>
      </span>
      <h1>Избранное</h1>
      {!!favourites.length ? (
        <CardList items={favourites} />
      ) : (
        <div className="not-found">Вы не добавили еще ни одного товара</div>
      )}
    </div>
  );
};