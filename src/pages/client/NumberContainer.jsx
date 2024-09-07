import React from "react";
import styles from "./NumberContainer.module.scss";
export const NumberContainer = () => {
  (() => {
    const counter = document.querySelectorAll(".counter");
    // covert to array
    const array = Array.from(counter);
    // select array element
    array.map((item) => {
      // data layer
      let counterInnerText = item.textContent;

      let count = 1;
      let speed = item.dataset.speed / (counterInnerText);
      function counterUp() {
        item.textContent = count++;
        if (counterInnerText < count) {
          clearInterval(stop);
        }
      }
      const stop = setInterval(() => {
        counterUp();
      }, speed);
    });
  })();
  return (
    <div className={`${styles.boxNumberContainer} mt-20`}>
      <div className="grid grid-cols-4">
        {/* 1 */}
        <div>
          <div className={styles.boxNumber}>
            <img
              src="https://demo2.cybersoft.edu.vn/static/media/003-students.e1a7c67b.png"
              alt=""
            />
          </div>
          <div className={styles.textNumber}>
            <span className="counter">9000</span>
          </div>
          <p className={styles.textNumberTitle}>Học Viên</p>
        </div>
        {/* 2 */}
        <div>
          <div className={styles.boxNumber}>
            <div>
              <img
                src="https://demo2.cybersoft.edu.vn/static/media/001-timetable.0e009173.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.textNumber}>
            <span className="counter">1000</span>
          </div>
          <p className={styles.textNumberTitle}>Khóa Học</p>
        </div>
        {/* 3 */}
        <div>
          <div className={styles.boxNumber}>
            <div>
              <img
                src="https://demo2.cybersoft.edu.vn/static/media/002-hourglass.548810be.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.textNumber}>
            <span className="counter">33200</span>
          </div>
          <p className={styles.textNumberTitle}>Giờ Học</p>
        </div>
        {/* 4 */}
        <div>
          <div className={styles.boxNumber}>
            <div>
              <img
                src="https://demo2.cybersoft.edu.vn/static/media/004-teacher.5bbd6eec.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.textNumber}>
            <span className="counter">400</span>
          </div>
          <p className={styles.textNumberTitle}>Giảng Viên</p>
        </div>
      </div>
    </div>
  );
};
