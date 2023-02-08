import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../api/orderApi";

// Get Orders
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderApi.getOrders();
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Search Order
export const searchOrders = createAsyncThunk(
  "order/searchOrder",
  async (payload, { rejectWithValue }) => {
    try {
      return await orderApi.searchOrders(payload);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors[0]);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  success: false,
  error: null,
  loading: false,
  orders: [],
};

const Orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: {
    // getOrders
    [getOrders.pending]: (state) => {
      state.loading = true;
    },

    [getOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orders = action.payload;
    },

    [getOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // searchOrder
    [searchOrders.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.orders = payload;
    },
    [searchOrders.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { reset } = Orderslice.actions;
export default Orderslice.reducer;
