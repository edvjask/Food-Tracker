import axiosInstance from "../httpClient";

export const getSavedPlans = async (token) => {
  try {
    return await axiosInstance.get(`/plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (ex) {
    console.error(ex);
  }
};
