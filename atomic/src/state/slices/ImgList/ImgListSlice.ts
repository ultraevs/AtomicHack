import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImg = createAsyncThunk("imgList", async (img: string) => {
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

    return { success: response.status, data: response.data };
  } catch (error: any) {
    console.error(error);
    return { success: error.response.status };
  }
});

// export const addHistory = createAsyncThunk("imgList", async (data: any) => {
//   try {
//     const response = await axios.post(
//       "https://atomic.shmyaks.ru/v1/addhistory",
//       {
//         date: data.date,
//         result: data.result,
//         objects: data.objects,
//         photo: data.photo,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     return { success: true, data: response.data };
//   } catch (error) {
//     return { success: false, error: error };
//   }
// });

const initialState = {
  items: [],
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImg.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(uploadImg.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.data.images;
      state.count = action.payload.data.images.length;
    });
    builder.addCase(uploadImg.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setImgList } = imgListSlice.actions;

export default imgListSlice.reducer;
