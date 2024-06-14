import axios from "axios";

export const loginUser = async (input: LoginInput) => {
  try {
    const response = await axios.post(
      "https://atomic.shmyaks.ru/v1/login",
      {
        id: Number(input.id),
        password: input.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data.token };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const infoUser = async () => {
  try {
    const response = await axios.get("https://atomic.shmyaks.ru/v1/user_info", {
      withCredentials: true,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
