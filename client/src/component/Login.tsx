import {
  Button,
  Card,
  Form,
  Input,
  notification,
  type FormProps,
  type NotificationArgsProps,
} from "antd";
import type { UserForm } from "../interface/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { createContext, useEffect, useMemo } from "react";
import { fetchUsers } from "../apis/user.api";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";

const Login = () => {
  const [form] = Form.useForm<UserForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { users, loading } = useAppSelector((state) => state.userSlice);

  console.log(users);

  // Gọi API lấy user khi load trang
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [api, contextHolder] = notification.useNotification();
  const Context = createContext({ name: "" });
  const contextValue = useMemo(() => ({ name: "" }), []);

  const openNotification = (placement: NotificationArgsProps["placement"]) => {
    api.success({
      message: "Đăng nhập thành công!",
      placement,
    });
  };

  const onFinish: FormProps<UserForm>["onFinish"] = (values) => {
    const { email, password } = values;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      api.error({
        message: "Thông tin đăng nhập không hợp lệ!",
        placement: "topRight",
      });
      return;
    }

    // lưu tạm user đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));

    openNotification("topRight");

    setTimeout(() => {
      navigate(user.role === "admin" ? "/manager/category" : "/");
    }, 600);
  };

  const onFinishFailed: FormProps<UserForm>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="w-[100%] text-center text-4xl font-bold">Đăng Nhập</h1>
        <div className="w-[36%]">
          <div className="text-[#52525B] mt-5 mb-5 text-center text-[12px]">
            QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ
            dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh
            chóng và hiệu quả!
          </div>
          <Card>
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              requiredMark={false}
              validateTrigger="onSubmit"
            >
              <Form.Item<UserForm>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống" },
                  {
                    validator: async (_, value) => {
                      if (!value) return Promise.resolve();
                      const u = users.find((x) => x.email === value);
                      if (!u)
                        return Promise.reject(
                          new Error("Email không tồn tại trong hệ thống")
                        );
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Địa chỉ Email"
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item<UserForm>
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Mật khẩu"
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={loading}
                >
                  Đăng Nhập
                </Button>
              </Form.Item>

              <div className="text-center">
                <span>Chưa có tài khoản?</span>&nbsp;
                <Link to="/register">Đăng ký</Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Login;
