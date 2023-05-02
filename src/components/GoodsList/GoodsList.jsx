import { SingleGoodCard } from "../SingleGoodCard/SingleGoodCard";
import "./index.css";
import { CardContext } from "../context/card_context";
import { useContext } from "react";

export const GoodsList = ({ items }) => {
  const { handleProductLike } = useContext(CardContext);

  return (
    <div className="cards">
      {items.map((element) => {
        return (
          <SingleGoodCard
            {...element}
            key={element.name}
            product={element}
            onProductLike={handleProductLike}
            id={element._id}
          />
        );
      })}
    </div>
  );
};
