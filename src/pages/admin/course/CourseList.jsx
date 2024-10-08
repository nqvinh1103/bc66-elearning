import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Input,
  Pagination,
  Popconfirm,
  Rate,
  Table,
  Tag,
} from "antd";
import { useQueryParams } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { courseApi } from "../../../apis/course.api";
import { PATH } from "../../../constants/path";
const { Search } = Input;

export const CourseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-courses", currentPage],
    queryFn: () => courseApi.getListCoursePagination(currentPage, 10),
  });
  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;
  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  const onSearch = (value) => {
    setQueryParams({
      tenKhoaHoc: value || undefined,
    });
  };

  const courseSearch = dataSource?.filter((element) =>
    element.tenKhoaHoc
      .toLowerCase()
      .includes(queryParams?.tenKhoaHoc?.toLowerCase())
  );

  const { mutate: handleDeleteCourseApi } = useMutation({
    mutationFn: (maKhoaHoc) => courseApi.deleteCourse(maKhoaHoc),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["list-courses"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["list-courses"],
        stale: true,
        refetchType: "all",
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const navigate = useNavigate();
  const columns = [
    {
      title: "MaKhoaHoc",
      key: "maKhoaHoc",
      dataIndex: "maKhoaHoc",
      width: 200,
    },
    {
      title: "TenKhoaHoc",
      key: "tenKhoaHoc",
      dataIndex: "tenKhoaHoc",
      width: 200,
    },
    {
      title: "HinhAnh",
      key: "hinhAnh",
      width: 200,
      render: (record) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.biDanh}
            className="w-[150px] h-[170px] rounded-sm object-cover"
          />
        );
      },
    },
    {
      title: "LuotXem",
      key: "luotXem",
      dataIndex: "luotXem",
    },
    {
      title: "Rate",
      key: "rate",
      dataIndex: "danhGia",
      width: 200,
      render: () => {
        return <Rate disabled allowHalf defaultValue={5} count={5} />;
      },
    },
    {
      title: "Hot",
      key: "hot",
      dataIndex: "hot",
      render: () => {
        return <Tag color="red">Hot 🔥 </Tag>;
      },
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
                navigate(
                  PATH.updateCourse.replace(
                    ":maKhoaHoc",
                    `${record.maKhoaHoc.toString()}`
                  )
                );
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
      <h3 className="font-medium text-2xl mb-[30px]">List Courses</h3>
      <div className="flex justify-end mb-[20px]">
        <Search
          placeholder="Keyword"
          className="w-1/2"
          allowClear
          size="large"
          enterButton="Search"
          onSearch={onSearch}
        />
      </div>
      <Table
        rowKey="maKhoaHoc"
        columns={columns}
        dataSource={queryParams?.tenKhoaHoc ? courseSearch : dataSource}
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
