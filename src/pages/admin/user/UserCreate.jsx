import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { useAuth } from "hooks";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../../apis/user.api";
import { PATH } from "../../../constants/path";
import { CreateUserSchema } from "../../../schema/CreateOrUpdateUserSchema";

export const UserCreate = () => {
  const { user } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(CreateUserSchema),
  });
  const navigate = useNavigate();
  const { mutate: handleAddUser, isPending } = useMutation({
    mutationFn: (payload) => userApi.addUser(payload),
    onSuccess: () => {
      toast.success("Tạo người dùng thành công");
      navigate(PATH.user);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: listUserType } = useQuery({
    queryKey: ["category"],
    queryFn: () => userApi.getListUserType(),
  });
  const onSubmit = async (values) => {
    values.maNhom = "GP01";
    handleAddUser(values);
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
            Thêm Người Dùng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
