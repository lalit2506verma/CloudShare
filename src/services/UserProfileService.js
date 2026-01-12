import { myAxios } from "../helper/AxiosConfig"

export const updateUserProfile = async (data, userId) => {
  try {
    const response = await myAxios.put(`/api/user/${userId}`, data);
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}