import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import cn from "classnames";
import { AuthTemplate } from "components";
import { useAuth, useQueryParams } from "hooks";
import { useOpenModal } from "hooks/useOpenModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { courseApi } from "../../apis/course.api";
import { userManagementActions } from "../../store/userManagement";
import styles from "./Header.module.scss";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { isOpen, openModal, closeModal } = useOpenModal();
  const [queryParams, setQueryParams] = useQueryParams();
  const { accessToken, user } = useAuth();
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(userManagementActions.logout());
      toast.success("Logout Success");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-danhmuc"],
    queryFn: () => courseApi.getDanhMucKhoaHoc(),
  });

  console.log(data);

  return (
    <>
      <Container
        className={cn({
          "header-fixed": scroll,
        })}
      >
        <div className={styles.header}>
          <nav className="max-w-[1200px] w-full flex items-center mx-auto">
            <div className="flex justify-between w-full">
              <div className={styles.header_left}>
                <div className="relative group">
                  <NavLink
                    to="/"
                    target="_blank"
                    className="group-hover:text-blue-500"
                  >
                    DANH MỤC
                  </NavLink>
                  <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-lg">
                    {data?.map((item) => {
                      return (
                        <NavLink
                          key={`danhmuc-${item.maDanhMuc}`}
                          to={`/danhmuckhoahoc/${item.maDanhMuc}`}
                          target="_blank"
                          className="group-hover:text-blue-500"
                        >
                          {item.tenDanhMuc}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
                <NavLink to="/classes" className="hover:text-blue-500">
                  KHÓA HỌC
                </NavLink>
                <NavLink to="/blog" className="hover:text-blue-500">
                  BLOG
                </NavLink>
                <div className="relative group">
                  <NavLink to="/" className="group-hover:text-blue-500">
                    SỰ KIỆN
                  </NavLink>
                  <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-lg">
                    <NavLink
                      to="/sale"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sale Cuối Năm
                    </NavLink>
                    <NavLink
                      to="/giangsinh"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Giáng Sinh
                    </NavLink>
                    <NavLink
                      to="/noel"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Noel
                    </NavLink>
                  </div>
                </div>
                <NavLink to="/detail" className="hover:text-blue-500">
                  THÔNG TIN
                </NavLink>
              </div>
              <ul className={styles.header_right}>
                <li>
                  <NavLink to="/">
                    <i className="fa-regular fa-bell"></i>
                    THÔNG BÁO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <i className="fa-regular fa-circle-question"></i>
                    TRỢ GIÚP
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <i className="fa-solid fa-globe"></i>
                    English
                  </NavLink>
                </li>
                {accessToken ? (
                  <li>
                    <NavLink to="/" onClick={() => handleLogout()}>
                      <i className="fa-solid fa-fa-sign-out-alt"></i>
                      Đăng Xuất
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/" onClick={openModal}>
                      <i className="fa-regular fa-face-smile-wink"></i>
                      TÀI KHOẢN
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          <div
            className={cn(
              styles.header_bottom,
              "max-w-[1200px] w-full flex items-center mx-auto"
            )}
          >
            <div className={styles.header_logo}>
              <NavLink to="/">
                <svg
                  viewBox="0 0 192 65"
                  className="h-[50px] w-[200px] fill-[#fff] block"
                >
                  <image
                    href="https://demo2.cybersoft.edu.vn/logo.png"
                    width="200"
                    height="70"
                  />
                  <g fillRule="evenodd">
                    <path d="M35.6717403..." />
                  </g>
                </svg>
              </NavLink>
            </div>
            <div className={styles.header_search}>
              <Search>
                <input
                  className="p-10 w-full rounded-6 bg-[#333] mt-8 text-white"
                  value={inputValue}
                  placeholder="Tìm kiếm"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setQueryParams({
                      sanPham: inputValue || undefined,
                    });
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </Search>
            </div>
          </div>
        </div>
      </Container>
      <AuthTemplate isOpen={isOpen} onCloseModal={closeModal} />
    </>
  );
};

const Container = styled.header`
  background: white;
  box-shadow: 0px 16px 10px -5px rgba(0, 0, 0, 0.1);

  &.header-fixed {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateZ(0);
    z-index: 100;
  }
`;

const Search = styled.div`
  margin-right: 10px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  background: #f5f5f5;

  input {
    margin-top: 0;
    background: #f5f5f5;
    color: #111;
    outline: none;
    border-radius: 0;
    height: 46px;
  }

  button {
    border: none !important;
    background: #f5f5f5 !important;
    color: black !important;
    &:hover {
      color: var(--primary-color) !important;
    }
  }
`;
