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

export const addNewPlan = async (token, data) => {
  try {
    return await axiosInstance.post(
      "/plans",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (ex) {
    console.error(ex);
  }
};

export const deletePlan = async (token, id) => {
  try {
    return await axiosInstance.delete(`/plans/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (ex) {
    console.error(ex);
  }
};

export const editPlan = async (token, id, editedPlan) => {
  try {
    return await axiosInstance.patch(`/plans/${id}`, editedPlan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (ex) {
    console.error(ex);
  }
};
