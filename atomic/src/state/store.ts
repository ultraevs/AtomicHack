import { configureStore } from "@reduxjs/toolkit";
import imgListSlice from "./slices/ImgList/ImgListSlice";

export const store = configureStore({
  reducer: {
    imgList: imgListSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
