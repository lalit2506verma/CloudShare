import { myAxios } from "../helper/AxiosConfig"

export const registerUser = async (user) => {
  console.log(user);
  
  try {
    const response = await myAxios.post("/api/user/", user);
    return response.data;
  }
  catch(error) {
    console.log(error);
    throw error;
  }
}