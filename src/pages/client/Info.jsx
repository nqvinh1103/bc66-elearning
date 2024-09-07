import React from "react";
import styles from "./Info.module.scss"; // Import as 'styles' to map class names

export const Info = () => {
  return (
    <div className={styles.itemInfo}>
      <div className={`${styles.largeItem} ${styles.infoItemHome} row-span-2`}>
        <div className={`${styles.infoContent} text-white`}>
          <h3 className="font-700 text-2xl">KHÓA HỌC</h3>
          <p className="font-300">
            <span className="font-700">Học qua dự án thực tế</span>, học đi đôi với hành, không lý
            thuyết lan man, phân tích cội nguồn của vấn đề, xây dựng từ các ví
            dụ nhỏ đến thực thi một dự án lớn ngoài thực tế để học viên học xong
            làm được ngay
          </p>
        </div>
      </div>
      <div className={`${styles.smallItem1} ${styles.infoItemHome}`}>
        Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
      </div>
      <div className={`${styles.smallItem2} ${styles.infoItemHome}`}>
        Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
      </div>
      <div className={`${styles.smallItem2} ${styles.infoItemHome}`}>
        Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
      </div>
      <div className={`${styles.smallItem2} ${styles.infoItemHome}`}>
        Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
      </div>
    </div>
  );
};
