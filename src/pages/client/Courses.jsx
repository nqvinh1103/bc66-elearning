import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import { courseApi } from "apis";
import { NavLink } from "react-router-dom";
import styles from "./Course.module.scss";
const { Meta } = Card;

const Courses = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['list-course'],
    queryFn: () => courseApi.getListCourse(),
  });
  console.log(data);
  return (
    <>
      {/* First session */}
      <Row gutter={24}>
        {data?.map((course, index) => {
          const { hinhAnh, maKhoaHoc, tenKhoaHoc } = course;
          if (index >= 1 && index < 13) {
            return (
              <Col span={6} key={maKhoaHoc}>
                <NavLink to={`/chitiet/${maKhoaHoc}`}>
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
                        src={hinhAnh}
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
                        <span className={styles.customTitle}>{tenKhoaHoc}</span>
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
                        <i
                          className={`${styles.textStar} fas fa-star mr-1`}
                        ></i>
                        <span className={styles.textStar}>4.9</span>
                        <span className={styles.cardColor}> (7840)</span>
                      </div>
                    </div>
                  </Card>
                </NavLink>
              </Col>
            );
          }
        })}
      </Row>
    </>
  );
};

export default Courses;
