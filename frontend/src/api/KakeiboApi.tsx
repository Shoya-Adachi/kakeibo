import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const GetMonthTotalApi = async (date: string) => {
  try {
    const response = await axios.get(`http://${API_URL}/api/v1/kakeibo/total`, {
      params: {
        month: date,
      },
    });

    return response.data;
  } catch (error) {
    console.error;
    throw error;
  }
};

export const CreateKakeiboApi = async (data: any) => {
  try {
    const response = await axios.post(`http://${API_URL}/api/v1/kakeibo`, {
      user_id: 1,
      date: data.date,
      salary: data.salary,
      salary2: data.salary2,
      food: data.food,
      life: data.life,
      medical: data.medical,
      entertainment: data.entertainment,
      amusement: data.amusement,
      etc: data.etc,
      total_income: data.total_income,
      total_expenditures: data.total_expenditures,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
