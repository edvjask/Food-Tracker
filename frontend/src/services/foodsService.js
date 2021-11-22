import axiosInstance from "../httpClient";

export const getDefault = async () => {
  try {
    return await axiosInstance.get("/subscribers");
  } catch (err) {
    console.error("GET failed", err);
  }
};
