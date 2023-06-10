import "./App.css";
import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { api } from "../../utils/api";
import { useDebounce } from "../../utils/utils";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductPage } from "../../pages/ProductPage/ProductPage";
import { CataloguePage } from "../../pages/CataloguePage/CataloguePage";
import { CardContext } from "../context/card_context";
import { UserContext } from "../context/user_context";
import { HomePage } from "../../pages/HomePage/HomePage";
import { FaqPage } from "../../pages/FAQPage/Faq";
import { FavouritePage } from "../../pages/FavouritePage/FavouritePage";
import { Private } from "../../pages/Private/Private";
import { Popup } from "../Popup/Popup";
import { SignIn } from "../Auth/SignIn/SignIn";
import { SignUp } from "../Auth/SignUp/SignUp";
import { ChangePassword } from "../Auth/ChangePassword/ChangePassword";
import { parseJwt } from "../../utils/parseJWT";
import { NotAuth } from "../../pages/NotAuth/NotAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../storageToolKit/user/userSlice";
import { getProducts } from "../../storageToolKit/products/productSlice";
import { Cart} from "../../pages/Cart/Cart";
import { openNotification } from "../Notification/Notification";


function App() {
// Объявление стейтов
const [items, setItems] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [toCartCounter, setToCartCounter] = useState(0);
const [activeModal, setShowModal] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [toCart, setToCart] = useState([]);

// Объявление редакс-диспетчера (им оборачивают функции для обновления хранилища; диспетчер вызывает соответствающий редуктор)
const dispatch = useDispatch();
// Объявление селекторов редакса. Селектор - функция, принимающая состояние редакса как аргумент, возвращает данные, полученные из этого состояния.
const currentUser = useSelector((s) => s.user.data);

const { data: products, favourites } = useSelector((s) => s.products);

//Объявление функции для фильтрации по id автора
const items_filtered = (products) =>
products.filter((el) => el.author._id === "63ee212b59b98b038f77b691")

  //Объявление функции для поиска
const handleSearch = (search) => {
  api
    .searchProducts(search)
    .then((data) => setItems(items_filtered(data, currentUser._id)));
};

// Добавление use-debounce
const debounceValueInApp = useDebounce(searchQuery, 500);
// Проверка на статус авторизации, вызов функции с данными пользователя и функции для отображения продуктов
useEffect(() => {
  if (!isAuthenticated) {
    return;
  }
  dispatch(getUser()).then(() => dispatch(getProducts()));
}, [dispatch, isAuthenticated]);

// Use-effect для поиска
useEffect(() => {
  if (debounceValueInApp === undefined) return;
  handleSearch(debounceValueInApp);
}, [debounceValueInApp]);

//Объявление useNavigate
const navigate = useNavigate();

// Use-effect для установления статуса авторизация пользователя
useEffect(() => {
  const token = localStorage.getItem("token");
  const uncodedToken = parseJwt(token);
  if (uncodedToken?._id) {
    setIsAuthenticated(true);
  }
}, [navigate]);
// Use-effect для фильтрации продуктов по id автора
useEffect(() => {
  setItems(products.filter((el) => el.author._id === "63ee212b59b98b038f77b691"));
}, [products, favourites]);

//Объявление функции для сортировки товаров

const setSortItems = (sortWay) => {
  switch(sortWay) {
  case "Сначала дешевые":
    const sortPrice = items.sort((a, b) => a.price - b.price);
    setItems([...sortPrice]);
    break
  case "Сначала дорогие":
    const sortExpensive = items.sort((a, b) => b.price - a.price);
    setItems([...sortExpensive]);
    break;
  case "Популярные":
      const sortPopular = items.sort((a, b) => b.likes.length - a.likes.length);
      setItems([...sortPopular]);
    break;
  case "Новинки":
      const sortNew = items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setItems([...sortNew]);
      break;
  case "По скидке":
    const sortDiscount = items.sort((a, b) => b.discount - a.discount);
      setItems([...sortDiscount]);
      break;
      default:
  }
};

// Функция выхода из аккаунта
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/sign-in");
  setIsAuthenticated(false);
};


//  Функция для добавления товара в корзину
const handleAddProductToCart = (product) => {
  // Создание нового объекта для продукта, помещаемого в корзину. Добавляется счетчик quantity
  const itemToCart = {
    id: product._id,
    name: product.name,
    pictures: product.pictures,
    price: product.price,
    quantity: 1,
    discount: product.discount

  };
  // Флаг
  let isInCart = false
  // Если продукт добавлен в корзину
  toCart.filter(el => {
      if (el.id === itemToCart.id) {
      isInCart = true;
      setToCartCounter((state) => state + 1);
      openNotification("success","Успешно","Товар добавлен в корзину");
      return el.quantity++
      }
      else return el; 
    }
  )
  // Если продукт не добавлен в корзину
  if (!isInCart) {
    setToCart(() => [...toCart, itemToCart]);
    setToCartCounter((state) => state + 1);
    openNotification("success","Успешно","Товар добавлен в корзину");
  }
};

//Объявление контекста
const contextUserValue = {
  currentUser,
  searchQuery,
  setSearchQuery,
  setToCartCounter,
  toCartCounter,
  setSort: setSortItems,
  isAuthenticated,
  handleLogout,
};

const contextCardValue = {
  items: items,
  setToCartCounter,
  toCartCounter,
  setItems,
  items_filtered,
  toCart,
  setToCart,
  handleAddProductToCart,

};

  // Маршрутизация при авторизации
const authRoutes = (
  <>
    <Route
      path="sign-in"
      element={
        <Popup activeModal={activeModal} setShowModal={setShowModal}>
          <SignIn setShowModal={setShowModal} />
        </Popup>
      }
    ></Route>
    <Route
      path="sign-up"
      element={
        <Popup activeModal={activeModal} setShowModal={setShowModal}>
          <SignUp setShowModal={setShowModal} />
        </Popup>
      }
    ></Route>
    <Route
      path="change-password"
      element={
        <Popup activeModal={activeModal} setShowModal={setShowModal}>
          <ChangePassword setShowModal={setShowModal} />
        </Popup>
      }
    ></Route>
  </>
);

  //Верстка, навигация
  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthenticated ? (
            <main className="content container">
              <Routes>
                {/* Главная */}
                <Route path="/" element={<HomePage />}></Route>
                {/* Каталог */}
                <Route path="/catalog" element={<CataloguePage />}></Route>
                {/* Личный кабинет */}
                <Route path="/private" element={<Private />}></Route>
                {/* Корзина */}
                <Route
                  element={<Cart  />}
                  path="/cart"
                ></Route>
                {/* Страница продукта */}
                <Route
                  path="/product/:productId"
                  element={<ProductPage />}
                ></Route>
                {/* Часто спрашивают */}
                <Route path="faq" element={<FaqPage />}></Route>
                {/* Избранное */}
                <Route path="favourites" element={<FavouritePage />}></Route>
                {authRoutes}
                <Route
                  path="*"
                  element={
                    <div className="error_not_found_title">
                      Страница не найдена
                      <div className="error_not_found_sad_face"></div>
                      <button
                        className="error_not_found_button"
                        onClick={() => navigate("/")}
                      >
                        На главную
                      </button>
                    </div>
                  }
                ></Route>
                <Route path="not_authenticated" element={<NotAuth />}></Route>
              </Routes>
            </main>
          ) : (
            <div className="not__auth">
              Пожалуйста, авторизуйтесь
              <button
                className="not_auth_btn"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                {" "}
                Вход / Регистрация
              </button>
              <Routes>{authRoutes}</Routes>
            </div>
          )}
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
