import { Button } from "antd";
import { Input } from "components";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
export const AccountInfo = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log("1243");
  };
  const {user} = useAuth()
  useEffect(() => {
    reset({
      ...user,
    });
  }, [user, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-[20px] text-left">
      <p className="text-20 font-600"> Thông tin tài khoản</p>
      <InputStyled
        label="Tài Khoản"
        name="taiKhoan"
        register={register}
        error={errors?.taiKhoan?.message}
        disabled={true}
      />
      <InputStyled
        label="Họ tên"
        name="hoTen"
        register={register}
        error={errors?.hoTen?.message}
      />
      <InputStyled
        label="Email"
        name="email"
        register={register}
        error={errors?.email?.message}
      />
      <InputStyled
        label="Mật Khẩu"
        name="matKhau"
        type = "password"
        register={register}
        error={errors?.matKhau?.message}
      />
      <InputStyled
        label="Số điện thoại"
        name="soDT"
        register={register}
        error={errors?.soDT?.message}
      />
      <InputStyled
        label="Mã nhóm"
        name="maNhom"
        register={register}
        error={errors?.maNhom?.message}
        disabled={true}
      />
      <InputStyled
        label="Mã loại người dùng"
        name="maLoaiNguoiDung"
        register={register}
        error={errors?.maLoaiNguoiDung?.message}
        disabled={true}
      />
      <div className="text-right mt-20">
        <Button htmlType="submit" type="primary" className="h-[46px] ">
          Update
        </Button>
      </div>
    </form>
  );
};
const InputStyled = styled(Input)`
  label {
    color: #000;
  }
  input {
    background: transparent;
    border: 1px solid #000;
    color: #000;
    &:disabled {
      background: #c6c6c6;
      cursor: not-allowed;
      border: 1px solid #c6c6c6;
    }
  }
`;