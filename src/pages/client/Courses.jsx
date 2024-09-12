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
          const { hinhAnh, maKhoaHoc, moTa, tenKhoaHoc } = course;
          if (index >= 1 && index < 13) {
            return (
              <Col span={6} key={maKhoaHoc}>
                <NavLink to={`/chitiet/${maKhoaHoc}`}>
                  <Card
                    hoverable
                    style={{
                      minHeight: "446px",
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
                      description={moTa}
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

      {/* Second session
    <div className="flex justify-between m-24">
      <h6>
        <a className="font-600 text-50 text-black" href="">
          Khóa học tham khảo
        </a>
      </h6>
    </div>
    <Row gutter={24}>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/javascriptt_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web </span>}
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-full-stack-nextjs_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web</span>}
            description="An anthology series in which police investigations..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/hinhanh8_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={
              <span className={styles.customTitle}>Lập trình Javascript</span>
            }
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-elearing-2_gp01.jpg"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web</span>}
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    Third session
    <div className="flex justify-between m-24">
      <h6>
        <a className="font-600 text-50 text-black" href="">
          Khóa học Front End React JS
        </a>
      </h6>
    </div>
    <Row gutter={24}>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/javascriptt_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web </span>}
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-full-stack-nextjs_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web</span>}
            description="An anthology series in which police investigations..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/hinhanh8_gp01.png"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={
              <span className={styles.customTitle}>Lập trình Javascript</span>
            }
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          hoverable
          style={{
            overflow: "hidden",
          }}
          cover={
            <img
              alt="example"
              src="https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-elearing-2_gp01.jpg"
              style={{
                height: "150px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          }
        >
          <Meta
            style={{ padding: 10 }}
            title={<span className={styles.customTitle}>Lập trình Web</span>}
            description="Lập trình hiện đang là xu hướng trên toàn thế giới..."
          />
          <div className={styles.cardIcon}>
            <span>
              <i className={`${styles.icon0Clock} far fa-clock`}></i> 8 giờ
            </span>
            <span>
              <i className={`${styles.iconCalendar} far fa-calendar-alt`}></i> 4
              tuần
            </span>
            <span>
              <i className={`${styles.iconLevel} fas fa-signal`}></i> Tất cả
            </span>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.titleMaker}>
              <div className={styles.imgFooter}>
                <img
                  src="https://demo2.cybersoft.edu.vn/static/media/avatar2.bb9626e2.png"
                  alt=""
                />
              </div>
              <span className={`${styles.cardColor} ml-2`}>Elon Musk</span>
            </div>
            <div>
              <p>
                800.000<sup>đ</sup>
              </p>
              <p>
                400.000<sup>đ</sup>
              </p>
            </div>
          </div>
        </Card>
      </Col>
    </Row> */}
    </>
  );
};

export default Courses;
