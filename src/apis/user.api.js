import { handleSleep } from "utils";
import { storage } from "../utils/store";
import { fetcher } from "./fetcher";

export const userApi = {
  login: async (payload) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
      await handleSleep()
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  register: async (payload) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload)
      await handleSleep()
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content)
    }
  },
  getUserByAccessToken: async () => {
    try {
      const token = storage.get("accessToken")
      if (token) {
        const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan", token)
        return response.data
      }
    } catch (error) {
      throw Error(error?.response?.data)
    }
  }
  
};
