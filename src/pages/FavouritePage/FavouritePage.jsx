import { useNavigate } from "react-router-dom";
import { GoodsList } from "../../components/GoodsList/GoodsList";
import "./favourites.css";
import  BackButton  from '../../components/Product/Back_Button/back_button';
import { useSelector } from "react-redux";
export const FavouritePage = () => {
  const { favourites } = useSelector(s => s.products)

  const navigate = useNavigate();

  return (
    <div className="favourites">
      <span className="favourites__back" >
      <BackButton onClick={() => navigate(-1)}/>
      </span>
      <h1>Избранное</h1>
      {!!favourites.length ? (
        <GoodsList items={favourites} />
      ) : (
        <div className="not-found">Вы не добавили еще ни одного товара</div>
      )}
    </div>
  );
};