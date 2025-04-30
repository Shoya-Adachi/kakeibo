import axios from "axios";
import { submitData } from "../pages/kakeiboInputs/KakeiboInputScreen";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const CreateKakeiboApi = async (data: submitData) => {
  try {
    const response = await axios.post(`http://${API_URL}/api/v1/kakeibo`, {
      user_id: 1,
      date: data.date,
      salary: data.salary,
      salary2: data.salary2,
      total_income: data.totalIncome,
      food: data.food,
      life: data.life,
      medical: data.medical,
      entertainment: data.entertainment,
      amusement: data.amusement,
      etc: data.etc,
      total_expenditures: data.totalExpenses,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
