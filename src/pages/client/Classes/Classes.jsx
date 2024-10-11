import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, List, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { useQueryParams } from "hooks";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { courseApi } from "../../../apis/course.api";
import styles from "./Classes.module.scss";

export const Classes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useQueryParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-courses", currentPage, queryParams.tenKhoaHoc],
    queryFn: () =>
      courseApi.getListCoursePagination(
        currentPage,
        10,
        queryParams?.tenKhoaHoc
      ),
  });

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;
  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <section className={styles.classesBody}>
        <div className={styles.titleClasses}>
          <h3>Khóa học</h3>
          <p>Bắt đầu hành trình nào!!!</p>
        </div>
        <div className={styles.classesContainer}>
          <div className={`${styles.grid} grid-cols-6`}>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox1}>
                <h6>Chương trình học</h6>
                <i className="fas fa-laptop"></i>
                <p>300</p>
              </div>
            </div>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox2}>
                <h6>Nhà sáng tạo</h6>
                <i className="fas fa-camera"></i>
                <p>10000</p>
              </div>
            </div>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox3}>
                <h6>Nhà thiết kế</h6>
                <i className="fas fa-briefcase"></i>
                <p>400</p>
              </div>
            </div>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox4}>
                <h6>Bài giảng</h6>
                <i className="fas fa-book"></i>
                <p>3000</p>
              </div>
            </div>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox5}>
                <h6>Video</h6>
                <i className="fas fa-play-circle"></i>
                <p>40000</p>
              </div>
            </div>
            <div className={styles.classesBoxItem}>
              <div className={styles.classesBox6}>
                <h6>Lĩnh vực</h6>
                <i className="fas fa-dice-d20"></i>
                <p>200</p>
              </div>
            </div>
          </div>
        </div>
        <h6 className="text-26 text-left mb-10 font-700 ps-30">
          Danh sách khóa học
        </h6>
        <List
          className="p-30"
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={dataSource}
          renderItem={(item) => (
            <Col key={item.maKhoaHoc}>
              <NavLink to={`/chitiet/${item.maKhoaHoc}`}>
                <Card
                  hoverable
                  style={{
                    minHeight: "380px",
                    overflow: "hidden", // Giới hạn nội dung khi quá cao
                    marginBottom: "20px",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={item.hinhAnh}
                      style={{
                        height: "150px",
                        width: "100%",
                        objectFit: "cover", // Đảm bảo hình ảnh lấp đầy khung mà không bị méo
                      }}
                    />
                  }
                >
                  <Meta
                    style={{ padding: 10 }}
                    title={
                      <span className={styles.customTitle}>
                        {item.tenKhoaHoc}
                      </span>
                    }
                    description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
                  />
                  <div className={styles.titleMaker}>
                    <div className={styles.imgFooter}>
                      <img
                        src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                        alt=""
                      />
                    </div>
                    <span className={`${styles.cardColor} ml-2`}>
                      Elon musk
                    </span>
                  </div>
                  <div className={styles.cardFooter}>
                    <div>
                      <p>
                        800.000<sup>đ</sup>
                      </p>
                      <p>
                        400.000<sup>đ</sup>
                      </p>
                    </div>
                    <div>
                      <i className={`${styles.textStar} fas fa-star mr-1`}></i>
                      <span className={styles.textStar}>4.9</span>
                      <span className={styles.cardColor}> (7840)</span>
                    </div>
                  </div>
                </Card>
              </NavLink>
            </Col>
          )}
        />
        <div className="flex justify-center mt-10 mb-10">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={10}
            onChange={(page) => setCurrentPage(page)}
            className="flex justify-center mt-10 mb-10"
          />
        </div>
      </section>
    </>
  );
};
