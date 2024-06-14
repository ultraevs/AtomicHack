import { configureStore } from "@reduxjs/toolkit";
import imgListSlice from "./slices/ImgList/ImgList";

export const store = configureStore({
  reducer: {
    imgList: imgListSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
