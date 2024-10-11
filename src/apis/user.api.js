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
  getUserListPagination: async (page, pageSize, taiKhoan = "") => {
    try {
      const response = taiKhoan
        ? await fetcher.get(
            `/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}&tuKhoa=${taiKhoan}`
          )
        : await fetcher.get(
            `/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`
          );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  addUser: async (payload) => {
    try {
      const response = await fetcher.post(
        "/QuanLyNguoiDung/ThemNguoiDung",
        payload
      );
      handleSleep();
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  searchUser: async (tuKhoa) => {
    try {
      const response = await fetcher.get(
        `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
      );
      handleSleep();
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  getListUserType: async () => {
    try {
      const response = await fetcher.get(
        "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  updateUser: async () => {
    try {
      const response = await fetcher.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung"
      );
      handleSleep();
      return response?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  deleteUser: async (taiKhoan) => {
    try {
      const response = await fetcher.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`
      );
      return response?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  getUserDetail: async (tuKhoa) => {
    try {
      const response = await fetcher.get(
        `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
};
