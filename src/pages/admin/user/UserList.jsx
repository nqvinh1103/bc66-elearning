import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Input, Pagination, Popconfirm, Table } from "antd";
import { useQueryParams } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../../apis/user.api";

export const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams();
  const { Search } = Input;
  const navigate = useNavigate();

  const { mutate: handleDeleteUserApi } = useMutation({
    mutationFn: (taiKhoan) => userApi.deleteUser(taiKhoan),
    onSuccess: () => {
      if (dataSource.length === 1) {
        setQueryParams({
          taiKhoan: undefined,
        });
      }
      toast.success("Xóa người dùng thành công");
      queryClient.resetQueries({
        queryKey: ["list-users"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["list-users"],
        stale: true,
        refetchType: "all",
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list-users", currentPage, queryParams.taiKhoan],
    queryFn: () =>
      userApi.getUserListPagination(
        currentPage,
        10,
        queryParams?.taiKhoan ?? ""
      ),
  });

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;
  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  const onSearch = (value) => {
    setQueryParams({
      taiKhoan: value || undefined,
    });
    refetch();
  };

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
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có muốn xóa người dùng này?"
              onConfirm={() => {
                console.log("delete");
                handleDeleteUserApi(record.taiKhoan.toString());
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
              title: "taiKhoan",
              href: "",
            },
          ]}
        />
      </div>
      <h3 className="font-medium text-2xl mb-[30px]">List Users</h3>
      <div className="flex justify-end mb-[20px]">
        <Search
          placeholder="Keyword"
          className="w-1/2"
          allowClear
          size="large"
          enterButton="Search"
          onKeyUp={onSearch}
          onSearch={onSearch}
        />
      </div>
      <Table
        rowKey="taiKhoan"
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
