import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { currentPage, categoryId, orderType, search, sort } = params;
  const { data } = await axios.get(
    `https://-636f5291f2ed5cb047daa480.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sort.sortProperty}&order=${orderType}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
