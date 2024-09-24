import React from "react";
import styles from "./Classes.module.scss";

export const Classes = () => {
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
    </section>
    </>
  );
};
