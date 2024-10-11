import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../../apis/user.api";
import { PATH } from "../../../constants/path";
import { UpdateUserSchema } from "../../../schema/CreateOrUpdateUserSchema";

export const UserUpdate = () => {
  const { user } = useAuth();
  const { taiKhoan } = useParams();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      hoTen: "",
      taiKhoan: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      matKhau: "",
    },
  });
  const navigate = useNavigate();
  const { mutate: handleUpdateUser, isPending } = useMutation({
    mutationFn: (payload) => userApi.updateUser(payload),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
      navigate(PATH.user);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: thongTinUser } = useQuery({
    queryKey: ["user-detail"],
    queryFn: () => userApi.searchUser(taiKhoan),
  });
  console.log(thongTinUser);
  const { data: listUserType } = useQuery({
    queryKey: ["category"],
    queryFn: () => userApi.getListUserType(),
  });
  useEffect(() => {
    if (thongTinUser?.length > 0) {
      setValue("hoTen", thongTinUser[0].hoTen);
      setValue("taiKhoan", thongTinUser[0].taiKhoan);
      setValue("email", thongTinUser[0].email);
      setValue("soDT", thongTinUser[0].soDt);
      setValue("matKhau", thongTinUser[0].matKhau);
      setValue("maLoaiNguoiDung", thongTinUser[0].maLoaiNguoiDung);
    }
  }, [thongTinUser, setValue]);
  const onSubmit = async (values) => {
    values.maNhom = "GP01";
    values.taiKhoan = thongTinUser[0].taiKhoan;
    console.log(values);
    handleUpdateUser(values);
  };
  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}
        noValidate
      >
        <Form.Item label="Họ tên">
          <Controller
            name="hoTen"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.hoTen && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.hoTen?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Tài Khoản">
          <Controller
            disabled
            name="taiKhoan"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.taiKhoan && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.taiKhoan?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.email && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.email?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Controller
            name="soDT"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.soDT && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.soDT?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Controller
            name="matKhau"
            defaultValue=""
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.matKhau && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.matKhau?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Loại Người Dùng">
          <Controller
            name="maLoaiNguoiDung"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select
                value={field}
                className="flex text-left"
                showSearch
                style={{
                  width: 225,
                }}
                placeholder="Chọn loại người dùng"
                onChange={(value) => {
                  field.onChange(value);
                }}
                options={listUserType?.map((ele) => ({
                  value: ele.maLoaiNguoiDung,
                  label: ele.tenLoaiNguoiDung,
                }))}
              />
            )}
          />
          {errors.maLoaiNguoiDung && (
            <p className="text-red-500 font-600 text-15 mt-10 text-left">
              {errors?.maLoaiNguoiDung?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Cập nhật Người Dùng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
