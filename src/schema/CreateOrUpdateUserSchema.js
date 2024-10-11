import { z } from "zod";

export const CreateUserSchema = z.object({
  hoTen: z.string().nonempty("Vui lòng họ tên người dùng"),
  taiKhoan: z.string().nonempty("Vui lòng tài khoản người dùng"),
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .regex(
      new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      "Vui lòng nhập đúng định dạng email"
    ),
  soDT: z
    .string()
    .nonempty("Vui lòng nhập số điện thoại")
    .regex(new RegExp(/^[0-9]+$/), "Số điện thoại phải là số"),
  matKhau: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .regex(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
      ),
      "Mật khẩu phải bao gồm số, chữ cái thường, chữ cái viết hoa, ký tự đặc biệt"
    ),
  maLoaiNguoiDung: z.string().nonempty("Vui lòng chọn loại người dùng"),
});

export const UpdateUserSchema = z.object({
  hoTen: z.string().nonempty("Vui lòng họ tên người dùng"),
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .regex(
      new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      "Vui lòng nhập đúng định dạng email"
    ),
  soDT: z
    .string()
    .nonempty("Vui lòng nhập số điện thoại")
    .regex(new RegExp(/^[0-9]+$/), "Số điện thoại phải là số"),
  matKhau: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .regex(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
      ),
      "Mật khẩu phải bao gồm số, chữ cái thường, chữ cái viết hoa, ký tự đặc biệt"
    ),
  maLoaiNguoiDung: z.string().nonempty("Vui lòng chọn loại người dùng"),
});
