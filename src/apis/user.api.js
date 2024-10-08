import { handleSleep } from "utils";
import { storage } from "../utils/store";
import { fetcher } from "./fetcher";

export const userApi = {
  login: async (payload) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
      await handleSleep();
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  register: async (payload) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
      await handleSleep();
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  getUserByAccessToken: async () => {
    try {
      const token = storage.get("accessToken");
      if (token) {
        const response = await fetcher.post(
          "/QuanLyNguoiDung/ThongTinTaiKhoan",
          token
        );
        return response.data;
      }
    } catch (error) {
      throw error?.response?.data;
    }
  },
  update: async (payload) => {
    try {
      await fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
      await handleSleep();
      const response = await userApi.getUserByAccessToken();
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
  getUserListPagination: async (page, pageSize) => {
    try {
      const response = await fetcher.get(
        `/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  deleteUser: async (payload) => {
    try {
      const response = await fetcher.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?=${payload}`
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
};
