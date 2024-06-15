import axios from "axios";

export const getAdminItems = async (data: any) => {
  console.log(data)
  try {
    const response = await axios.get(
      `http://localhost:8083/v1/getrecognitions?name=${data.name}&date=${data.date}&status=${data.status}`,
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
      "http://localhost:8083/v1/gethistory",

      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
