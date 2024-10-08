import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useAuth } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { courseApi } from "../../../apis/course.api";
import { PATH } from "../../../constants/path";
import { CreateCourseSchema } from "../../../schema/CreateOrUpdateCourseSchema";

export const CourseCreate = () => {
  const [imgSrc, setImgSrc] = useState("");
  const { user } = useAuth();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(CreateCourseSchema),
  });
  const handleChangeFile = () => {
    const target = event.target;
    const file = target?.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e?.target?.result);
      };
    }
  };
  const { data: listCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => courseApi.getDanhMucKhoaHoc(),
  });
  const navigate = useNavigate();
  const { mutate: handleAddCourse } = useMutation({
    mutationFn: (payload) => courseApi.addCourse(payload),
    onSuccess: () => {
      toast.success("Tạo khóa học thành công");
      navigate(PATH.course);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = async (values) => {
    values.maNhom = "GP01";
    values.taiKhoanNguoiTao = user.taiKhoan;
    const formData = new FormData();
    for (const key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
        formData.append("File", values.hinhAnh[0], values.hinhAnh.name);
      }
    }
    console.log(formData.get("File"));
    handleAddCourse(formData);
  };
  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onSubmitCapture={handleSubmit(onSubmit)}
      >
        <Form.Item label="Mã Khóa Học">
          <Controller
            name="maKhoaHoc"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.tenKhoaHoc && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.tenKhoaHoc?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Tên Khóa Học">
          <Controller
            name="tenKhoaHoc"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.maKhoaHoc && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.maKhoaHoc?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Bí Danh">
          <Controller
            name="biDanh"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.biDanh && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.biDanh?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Controller
            name="moTa"
            defaultValue=""
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.moTa && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.moTa?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Lượt Xem">
          <Controller
            name="luotXem"
            control={control}
            render={({ field }) => <InputNumber className="flex" {...field} />}
          />
          {errors.luotXem && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.luotXem?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Đánh giá">
          <Controller
            name="danhGia"
            control={control}
            render={({ field }) => <InputNumber className="flex" {...field} />}
          />
          {errors.danhGia && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.danhGia?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Danh Mục Khóa Học">
          <Controller
            name="maDanhMucKhoaHoc"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select
                className="flex text-left"
                showSearch
                style={{
                  width: 225,
                }}
                placeholder="Chọn danh mục khóa học"
                onChange={(value) => {
                  field.onChange(value);
                }}
                options={listCategory?.map((ele) => ({
                  value: ele.maDanhMuc,
                  label: ele.tenDanhMuc,
                }))}
              />
            )}
          />
          {errors.maDanhMucKhoaHoc && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.maDanhMucKhoaHoc?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Ngày tạo">
          <Controller
            name="ngayTao"
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  className="flex w-1/2"
                  picker="date"
                  format="DD/MM/YYYY"
                  onChange={(_, dateString) => {
                    field.onChange(dateString);
                  }}
                />
              );
            }}
          />
          {errors.ngayTao && (
            <p className="text-red-500 font-600 text-15 mt-10">
              {errors?.ngayTao?.message}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            {...register("hinhAnh")}
            accept="image/jpeg, image/png, image/gif, image/jpg"
            onChange={handleChangeFile}
          />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm Khóa Học
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
