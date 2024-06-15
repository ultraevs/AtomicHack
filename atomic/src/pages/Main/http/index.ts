import axios from "axios";

export const loginUser = async (input: any) => {
  try {
    const response = await axios.post(
      "https://atomic.shmyaks.ru/v1/addhistory",
      {
        date: input.date,
        result: input.result,
        objects: input.objects,
        photo: input.photo,
      },
      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
