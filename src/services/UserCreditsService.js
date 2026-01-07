import { myAxios } from "../helper/AxiosConfig"

export const getUserCredits = async () => {
  try {
    const response = await myAxios.get("/api/users/credits");
    console.log("Usercredit Service");
    
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}