import { myAxios } from "../helper/AxiosConfig"

export const placeOrder = async (order) => {
  try {
    const response = await myAxios.post("/payments/place-order", order);
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const verifyPayment = async (transaction) => {
  console.log(transaction);
  
  try {
    const response = await myAxios.post("payments/verify-payment", transaction)
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const fetchTransactions = async () => {
  try {
    const response = await myAxios.get("/api/transactions");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}