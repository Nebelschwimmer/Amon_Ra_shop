import { configureStore } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import productSlice from "./products/productSlice";
import userSlice from "./user/userSlice";

// Создание хранилища с помощью configureStore()
const store = configureStore({

// Корневой редуктор
    reducer: {
    // Указание "срезов" глобального состояния
    user: userSlice,
    products: productSlice
},
// Прослойка для работы с синхронными и асинхронными функциями
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Асинхронное поведение
    thunk: {
    extraArgument: api
    }
    })
});

export default store;