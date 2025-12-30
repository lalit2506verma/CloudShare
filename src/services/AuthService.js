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

export const loginUser = async (credentials) => {
  console.log(credentials);

  try {
    const response = await myAxios.post("/auth/login", credentials);
    // Setting token in the local Storage in browser
    localStorage.setItem("token", response);
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
  
}