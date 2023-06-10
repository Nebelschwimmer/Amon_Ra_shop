import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../components/Notification/Notification";

// createAsyncThunk - функция (action), принимающая тип экшена строкой (1) и колбэк (2), возвращает промис.
// В строке: первое слово - название слайса, после / - название экшена
// 1-й аргумент - данные извне
// 2-й аргумент - объект с опциями

// Данные пользователя
export const getUser = createAsyncThunk(
  "user/getUser",
  async function (
    dataOutside,
    { getState, fulfillWithValue, rejectWithValue, extra: api }
  ) {
    try {
      const data = await api.getUserInfo();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Обновление данных пользователя
export const changeUserData = createAsyncThunk(
  "user/changeUserData",
  async function (
    dataOutside,
    { getState, rejectWithValue, fulfillWithValue, extra: api }
  ) {
    try {
      const data = dataOutside.avatar
        ? await api.updateAvatar(dataOutside)
        : await api.updateUserInfo(dataOutside);
      openNotification(
        "success",
        "Успешно",
        dataOutside.avatar
          ? "Авaтар успешно изменен"
          : "Данные успешно изменены"
      );
      return fulfillWithValue(data);
    } catch (error) {
      openNotification("error", "Ошибка", "Не удалось изменить данные / аватар");
      return rejectWithValue(error);
    }
  }
);

const isError = (action) => {
  return action.type.endsWith("rejected");
};

// Изначальный стейт
const initialState = {
  data: {},
  loading: true,
  error: null,
  test: undefined,
};
// Создание среза для пользователя
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // Редукторы для асинхронных операций
  extraReducers: (builder) => {
    // Данные пользователя
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    // Обновление данных пользователя
    builder.addCase(changeUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      openNotification("error", "error", "Ошибка загрузки");
    });
  },
});

export default userSlice.reducer;
