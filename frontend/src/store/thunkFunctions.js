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
