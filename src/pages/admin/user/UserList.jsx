import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Pagination, Popconfirm, Table } from "antd";
import { useState } from "react";
import { userApi } from "../../../apis/user.api";

export const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-users", currentPage],
    queryFn: () => userApi.getUserListPagination(currentPage, 10),
  });
  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;
  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  const columns = [
    {
      title: "taiKhoan",
      key: "taiKhoan",
      dataIndex: "taiKhoan",
      width: 200,
    },
    {
      title: "hoTen",
      key: "hoTen",
      dataIndex: "hoTen",
      width: 200,
    },
    {
      title: "email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      width: 200,
    },
    {
      title: "tenLoaiNguoiDung",
      key: "tenLoaiNguoiDung",
      dataIndex: "tenLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                console.log("edit");
                // setDataEdit(record);
                // openModal();
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the movie"
              description="Are you sure to delete this movie?"
              onConfirm={() => {
                console.log("delete");
                handleDeleteCourseApi(record.maKhoaHoc.toString());
              }}
              onCancel={() => {}}
              placement="bottom"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={false}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Course List",
              href: "",
            },
          ]}
        />
      </div>
      <h3 className="font-medium text-2xl mb-[30px]">List Users</h3>
      <Table
        rowKey="maKhoaHoc"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={false}
      />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          defaultCurrent={1}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>

      {/* <AddOrEditMovieModal
        dataEdit={dataEdit}
        isOpen={isOpen}
        isPending={isCreating}
        onCloseModal={closeModal}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
};
