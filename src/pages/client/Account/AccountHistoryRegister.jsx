import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { courseApi } from "../../../apis/course.api";
import { userManagementActions } from "../../../store/userManagement";
import styles from "./AccountHistoryRegister.module.scss";

export const AccountHistoryRegister = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user.chiTietKhoaHocGhiDanh);
  const dispatch = useDispatch();
  const { mutate: handleCancelCourse } = useMutation({
    mutationFn: (payload) => courseApi.cancelCourse(payload),
    onSuccess: (response) => {
      dispatch(userManagementActions.getUserByAccessToken(response));
      toast.success("Hủy ghi danh khóa học thành công");
      navigate("/account");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.content);
    },
  });

  const onSubmitCourse = (maKhoaHoc) => {
    const payload = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: user?.taiKhoan,
    };
    handleCancelCourse(payload);
  };
  return (
    <>
      <div className={styles.findCourseNet}>
        <h6 className="font-700">Khóa học của tôi</h6>
        <form action="">
          <input
            type="text"
            className={styles.searchForm}
            placeholder="Tìm kiếm"
          />
        </form>
      </div>
      {user.chiTietKhoaHocGhiDanh.length > 0 &&
        user.chiTietKhoaHocGhiDanh.map((course) => {
          const { tenKhoaHoc, hinhAnh, maKhoaHoc } = course;
          return (
            <>
              <section className={styles.courseInfo}>
                <div className={styles.myCourseItem}>
                  <div className="grid grid-cols-4">
                    {/* 1 */}
                    <div className="">
                      <img className={styles.imgNet} src={hinhAnh} alt="" />
                    </div>
                    {/* 2 */}
                    <div className={`${styles.cardNetContent} col-span-2`}>
                      <h6 className="font-600">{tenKhoaHoc}</h6>
                      <p className={styles.colorCardTitle}>
                        ES6 là một chuẩn Javascript mới được đưa ra vào năm 2015
                        với nhiều quy tắc và cách sử dụng khác nhau...
                      </p>
                      <div className={styles.iconNetCard}>
                        <span className={styles.textCardTitle}>
                          <i
                            className={`far fa-clock ${styles.iconOclock}`}
                          ></i>
                          8 giờ
                        </span>
                        <span className={styles.textCardTitle}>
                          <i
                            className={`far fa-calendar ${styles.iconCalendar}`}
                          ></i>
                          23 giờ
                        </span>
                        <span className={styles.textCardTitle}>
                          <i
                            className={`fas fa-signal ${styles.iconLevel}`}
                          ></i>
                          All level
                        </span>
                      </div>
                      <p className={styles.iconStarNet}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </p>
                      <div>
                        <img
                          className={styles.imgNetFooter}
                          src="https://demo2.cybersoft.edu.vn/static/media/instrutor10.89946c43.jpg"
                          alt=""
                        />
                        <span className="ml-2">Nguyễn Nam</span>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className={styles.cancelNet}>
                      <button
                        onClick={() => onSubmitCourse(maKhoaHoc)}
                        className={styles.btnGlobal}
                      >
                        Hủy khóa học
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        })}
    </>
  );
};
