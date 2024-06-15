import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImg = createAsyncThunk(
  "imgList",
  async (img: string, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://atomic.shmyaks.ru/cv/check",
        {
          image: img,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(addHistory({ data: response.data, img: img }));

      return { success: response.status, data: response.data };
    } catch (error: any) {
      console.error(error);
      return { success: error.response.status };
    }
  }
);

export const addHistory = createAsyncThunk(
  "imgList",
  async ({ data, img }: { data: any; img: string }) => {
    
    try {
      const concatenatedString: string = data.objects.reduce(
        (accumulator: string, currentValue: string) => accumulator + currentValue[0] + ", ",
        ""
      ).slice(0, -2);

      const response = await axios.post(
        "http://localhost:8083/v1/addhistory",
        {
          date: "15.06.2024",
          result: data.result,
          status: concatenatedString,
          photo: img,
        },
        {
          withCredentials: true,
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error };
    }
  }
);

const initialState = {
  items: [],
  objects: [],
  count: 0,
  status: "idle",
};

export const imgListSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setImgList: (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.items.length;
      state.objects = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImg.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(uploadImg.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.data.images;
      state.objects = action.payload.data.objects;
      state.count = action.payload.data.images.length;
    });
    builder.addCase(uploadImg.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setImgList } = imgListSlice.actions;

export default imgListSlice.reducer;

// const concatenatedString: string = stringsArray.reduce((accumulator, currentValue) => accumulator + currentValue, '');
