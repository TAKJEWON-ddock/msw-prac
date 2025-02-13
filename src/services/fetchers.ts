import axios from "axios";

export const hello = async function () {
  const response = await axios.get("/hello");
  return response.data.message;
};

export const signUp = async function (params: any) {
  try {
    const response = await axios.post("/signup", params);
    return response;
  } catch (error) {
    throw error; // 에러를 다시 던져서 상위에서 핸들링 가능
  }
};

export const signIn = async function (params: any) {
  const response = await axios.post("/signin", params);
  return response;
};
