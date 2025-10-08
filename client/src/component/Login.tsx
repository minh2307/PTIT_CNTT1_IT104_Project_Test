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
import { createContext, useMemo } from "react";

const Login = () => {
  const [form] = Form.useForm<UserForm>();
  const navigate = useNavigate();

  const raw = localStorage.getItem("users") || "[]";
  const users: UserForm[] = JSON.parse(raw);

  console.log(users);

  type NotificationPlacement = NotificationArgsProps["placement"];

  const Context = createContext({ name: "Default" });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Dăng nhập thành công!`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "" }), []);

  const onFinish: FormProps<UserForm>["onFinish"] = (values) => {
    const { email } = values;
    const user = users.find((u) => u.email === email);
    if (!user) {
      console.log("Thông tin đăng nhập không hợp lệ");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));

    console.log("Đăng nhập thành công");

    openNotification("topRight");

    setTimeout(() => {
      if (user.role === "admin") navigate("/manager/category");
      else navigate("/");
    }, 600);
  };

  const onFinishFailed: FormProps<UserForm>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="w-[100%] text-center text-4xl font-bold ">Đăng Nhập</h1>
        <div className="w-[36%]">
          <div className="text-[#52525B] mt-5 mb-5 text-center text-[12px]">
            QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ
            dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh
            chóng và hiệu quả!{" "}
          </div>
          <Card>
            <Form
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
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
                        return Promise.reject(new Error("Email không tồn tại"));
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  className="placeholder:text-center"
                  placeholder="Địa chỉ Email"
                />
              </Form.Item>

              <Form.Item<UserForm>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const email = getFieldValue("email");
                      const u = users.find((x) => x.email === email);

                      if (!u || u.password !== value)
                        return Promise.reject(new Error("Mật khẩu không đúng"));
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  className="[&>input]:placeholder:text-center"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[100%]"
                  size="large"
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
              <div className="text-center">
                <span>Chưa có tài khoản?</span>
                &nbsp;
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
