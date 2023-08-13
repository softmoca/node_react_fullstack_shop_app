import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser", //action의 타입
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/register`, //백엔드 api url
        body
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    } //rejectWithValue에 string 을 넣어주면    action의 Payload(state에 전달하는 값)가 된다.
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/login`, body); //이메일과 패스워드가 body에 있다

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      console.log("aaa");
      const response = await axiosInstance.get(
        `/users/auth` //백엔드 api url
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/logout`);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/cart`, body);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async ({ cartItemIds, userCart }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/${cartItemIds}?type=array`
      );

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/users/cart?productId=${productId}`
      );

      response.data.cart.forEach((cartItem) => {
        response.data.productInfo.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data.productInfo[index].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
export const payProducts = createAsyncThunk(
  "user/payProducts",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/payment`, body);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
