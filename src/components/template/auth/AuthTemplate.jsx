// import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import { userApi } from "apis";
import cn from "classnames";
import { Input } from "components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userManagementActions } from "../../../store/userManagement";
import {
  Button,
  Form,
  FormContainer,
  GhostButton,
  Overlay,
  OverlayContainer,
  OverlayPanel,
  Paragraph,
  SignInContainer,
  SignUpContainer,
  SocialButton,
  SocialContainer,
  Title,
} from "./AuthStyles";
// import { handleError } from "utils";

export const AuthTemplate = ({ isOpen, onCloseModal }) => {
  const [signIn, setSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    // resolver: zodResolver(LoginSchema || RegisterSchema),
  });

  // Login mutation
  const { mutate: handleLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (payload) => userApi.login(payload),
    onSuccess: (response) => {
      dispatch(userManagementActions.login(response));
      onCloseModal();
      toast.success("Login Success");
      reset()
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.content);
    },
  });

  // Register mutation (example, replace with actual implementation)
  const { mutate: handleRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: (payload) => userApi.register(payload),
    onSuccess: () => {
      toast.success("Registration Successfull");
      reset();
      onCloseModal();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.content);
    },
  });
  // Submit handler for option
  const onSubmitLogin = async (values) => {
    const payload = {
      taiKhoan: values.taiKhoan_login,
      matKhau: values.password,
    };
    handleLogin(payload);
  };

  const onSubmitRegister = async (values) => {
    const payload = {
      hoTen: values.hoTen,
      taiKhoan: values.taiKhoan_register,
      matKhau: values.matKhau,
      email: values.email,
      soDT: values.soDT,
      maNhom: "GP01",
    }
    handleRegister(payload)
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      footer={null}
      centered
      className="custom-modal"
      destroyOnClose
      width={1200}
      styles={{
        body: {
          height: 600,
        },
      }}
    >
      <FormContainer
        className={cn({ "signin-active": signIn, "signup-active": !signIn })}
      >
        {signIn ? (
          <SignInContainer className="sign-in-container">
            <Form onSubmit={handleSubmit(onSubmitLogin)}>
              <Title>Sign in</Title>
              <SocialContainer>
                <SocialButton>
                  <i className="fab fa-facebook-f"></i>
                </SocialButton>
                <SocialButton>
                  <i className="fab fa-google-plus-g"></i>
                </SocialButton>
                <SocialButton>
                  <i className="fab fa-linkedin-in"></i>
                </SocialButton>
              </SocialContainer>
              <Paragraph>or use your account</Paragraph>
              <Input
                className="w-full"
                id="taiKhoan_login"
                placeholder="Tài khoản"
                register={register}
                name="taiKhoan_login"
                error={errors?.taiKhoan_login?.message}
              />
              <Input
                className="w-full"
                id="password"
                placeholder="Mật khẩu"
                register={register}
                type="password"
                name="password"
                error={errors?.password?.message}
              />
              <Paragraph>Forgot your password?</Paragraph>
              <Button type="submit" disabled={isPendingLogin}>Sign In</Button>
            </Form>
          </SignInContainer>
        ) : (
          <SignUpContainer className="sign-up-container">
            <Form onSubmit={handleSubmit(onSubmitRegister)}>
              <Title>Create Account</Title>
              <SocialContainer>
                <SocialButton>
                  <i className="fab fa-facebook-f"></i>
                </SocialButton>
                <SocialButton>
                  <i className="fab fa-google-plus-g"></i>
                </SocialButton>
                <SocialButton>
                  <i className="fab fa-linkedin-in"></i>
                </SocialButton>
              </SocialContainer>
              <Paragraph>or use your email for registration</Paragraph>
              Uncomment these lines to use inputs for registration
              <Input
                className="w-full"
                register={register}
                id="hoTen"
                name="hoTen"
                type="text"
                placeholder="Họ Tên"
                error={errors?.hoTen?.message}
              />
              <Input
                className="w-full"
                register={register}
                id="taiKhoan_register"
                name="taiKhoan_register"
                type="text"
                placeholder="Tài khoản"
                error={errors?.taiKhoan_register?.message}
              />
              <Input
                className="w-full"
                register={register}
                id="matKhau"
                name="matKhau"
                type="password"
                placeholder="Mật khẩu"
                error={errors?.matKhau?.message}
              />
              <Input
                className="w-full"
                register={register}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                error={errors?.email?.message}
              />
              <Input
                className="w-full"
                register={register}
                id="soDT"
                name="soDT"
                type="text"
                placeholder="Số điện thoại"
                error={errors?.soDT?.message}
              />
              <Button type="submit" disabled={isPendingRegister}>Sign Up</Button>
            </Form>
          </SignUpContainer>
        )}
        <OverlayContainer className="overlay-container">
          <Overlay className="overlay">
            <OverlayPanel className="overlay-panel">
              <Title>{signIn ? "Hello, Friend!" : "Welcome Back!"}</Title>
              <Paragraph>
                {signIn ? (
                  <>
                    Enter your personal details and start <br /> your journey
                    with us
                  </>
                ) : (
                  <>
                    To keep connected with us, please log in <br /> with your
                    personal info
                  </>
                )}
              </Paragraph>
              <GhostButton
                onClick={() => setSignIn(!signIn)}
                className="!mt-20"
              >
                {signIn ? "Sign Up" : "Sign In"}
              </GhostButton>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </FormContainer>
    </Modal>
  );
};
