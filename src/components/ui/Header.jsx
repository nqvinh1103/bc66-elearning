import { Button } from "antd";
import cn from "classnames";
import { AuthTemplate } from "components";
import { useQueryParams } from "hooks";
import { useOpenModal } from "hooks/useOpenModal";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import styles from "./Header.module.scss";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { isOpen, openModal, closeModal } = useOpenModal();
  const [queryParams, setQueryParams] = useQueryParams();

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
                <NavLink to="/" target="_blank">
                  DANH MỤC
                </NavLink>
                <NavLink to="/">KHÓA HỌC</NavLink>
                <NavLink to="/">BLOG</NavLink>
                <NavLink to="/">SỰ KIỆN</NavLink>
                <NavLink to="/">THÔNG TIN</NavLink>
                <NavLink to="/">
                  FOLLOW US ON
                  <i className="fa-brands fa-facebook px-8"></i>
                  <i className="fa-brands fa-instagram"></i>
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
                <li>
                  <NavLink to="/" onClick={openModal}>
                    <i className="fa-regular fa-face-smile-wink"></i>
                    TÀI KHOẢN
                  </NavLink>
                </li>
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
            {/* <div className={styles.header_cart}>
              <div className="relative">
                <div className="py-10 px-0">
                  <NavLink to="/" className="flex items-center">
                    <i className="fa-solid fa-cart-shopping text-[25px]"></i>
                  </NavLink>
                </div>
              </div>
            </div> */}
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
