import { fetcher } from "./fetcher";

export const userApi = {
  login: async (payload) => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
};
