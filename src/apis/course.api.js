import { fetcher } from "./fetcher";

export const courseApi = {
  getListCourse: async () => {
    try {
      const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  getDetailCourse: async (maKhoaHoc) => {
    try {
      const response = await fetcher.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  registerCourse: async (payload) => {
    console.log(payload)
    try {
      const response = await fetcher.post("/QuanLyKhoaHoc/DangKyKhoaHoc", payload);
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  }
};
