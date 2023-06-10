import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findLike } from "../../utils/utils";
import { api } from "../../utils/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (
    _,
    { extra: api, fulfillWithValue, rejectWithValue, getState }
  ) {
    try {
      const { user } = getState();
      const products = await api.getProductList();
      return fulfillWithValue({ ...products, user: user.data });
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getChangedProductLike = createAsyncThunk(
  "products/getChangedProductLike",
  async function (
    productOutside,
    { rejectWithValue, fulfillWithValue, getState }
  ) {
    try {
      const { user } = getState();
      const wasLiked = findLike(productOutside, user.data);
      const data = await api.changeLikeProductStatus(
        productOutside._id,
        wasLiked
      );

      return fulfillWithValue({ product: data, wasLiked: wasLiked });
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  favourites: [],
  total: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { total, products, user } = action.payload;
        state.data = products;
        state.total = total;
        state.favourites = products.filter((e) => findLike(e, user));
        state.loading = false;
      })
      .addCase(getChangedProductLike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { product, wasLiked } = action.payload;

        state.data = state.data.map((item) => {
          return item._id === product._id 
          ? product : item;
        });

        if (!wasLiked) {
          state.favourites.push(product);
        } else {
          state.favourites = state.favourites.filter(
            (favItem) => favItem._id !== product._id
          );
        }
      });
  },
});

export default productSlice.reducer;
