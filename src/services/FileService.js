import { myAxios } from "../helper/AxiosConfig"

export const fetchAllMyFiles = async () => {
  try {
    const response = await myAxios.get("/files/my-files");
    // console.log(response);
    return response;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}