import axios from "axios";

export const getAdminItems = async () => {
  try {
    const response = await axios.get(
      "https://atomic.shmyaks.ru/v1/getrecognitions",

      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getUserItems = async () => {
  try {
    const response = await axios.get(
      "https://atomic.shmyaks.ru/v1/gethistory",

      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
