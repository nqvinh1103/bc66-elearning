import { userApi } from "apis";
import { handleSleep } from "utils";
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
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
      );
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  registerCourse: async (payload) => {
    console.log(payload);
    try {
      const response = await fetcher.post(
        "/QuanLyKhoaHoc/DangKyKhoaHoc",
        payload
      );
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  getCourseCatalog: async (maDanhMuc) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
      );
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  getDanhMucKhoaHoc: async () => {
    try {
      const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data?.content);
    }
  },
  cancelCourse: async (payload) => {
    try {
      await fetcher.post("/QuanLyKhoaHoc/HuyGhiDanh", payload);
      const response = await userApi.getUserByAccessToken();
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
  getListCoursePagination: async (page, pageSize) => {
    try {
      const response = await fetcher.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}&MaNhom=GP01`
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  deleteCourse: async (maKhoaHoc) => {
    try {
      const response = await fetcher.delete(
        `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  addCourse: async (payload) => {
    try {
      const response = await fetcher.post(
        "/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        payload
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
  updateCourse: async (payload) => {
    try {
      const hinhAnh = payload.get("hinhAnh");
      const isFileUpload = hinhAnh instanceof File || hinhAnh instanceof Blob;
      const response = isFileUpload
        ? await fetcher.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", payload)
        : await fetcher.put(
            "QuanLyKhoaHoc/CapNhatKhoaHoc",
            Object.fromEntries(payload.entries())
          );
      handleSleep();
      return response?.data;
    } catch (error) {
      throw error?.response?.data;
    }
  },
};
