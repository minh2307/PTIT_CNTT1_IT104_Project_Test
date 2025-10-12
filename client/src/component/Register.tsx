import { Button, Card, Form, Input, message, type FormProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { UserForm } from "../interface/user.interface";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { addUser } from "../apis/user.api";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userSlice.list);

  const onFinish: FormProps<UserForm>["onFinish"] = async (values) => {
    const { fullName, email, password } = values;

    const newUser: UserForm = {
      id: Date.now(),
      fullName,
      email,
      password,
      role: "user",
    };

    try {
      const addedUser = await dispatch(addUser(newUser)).unwrap();
      console.log("User mới:", addedUser);

      message.success("Đăng ký thành công!");
      navigate("/");
    } catch {
      message.error("Đăng ký thất bại!");
    }
  };

  const onFinishFailed: FormProps<UserForm>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="w-[100%] text-center text-4xl font-bold">Đăng Ký</h1>
      <div className="w-[36%]">
        <div className="text-[#52525B] mt-5 mb-5 text-center text-[12px]">
          QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ
          dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh
          chóng và hiệu quả!
        </div>
        <Card>
          <Form
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
            validateTrigger="onSubmit"
          >
            <Form.Item<UserForm>
              name="fullName"
              rules={[
                { required: true, message: "Họ và tên không được để trống" },
              ]}
            >
              <Input size="large" placeholder="Họ và Tên" />
            </Form.Item>

            <Form.Item<UserForm>
              name="email"
              rules={[
                { required: true, message: "Email không được để trống" },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();
                    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
                    if (!emailRegex.test(value)) {
                      return Promise.reject(
                        new Error("Email không đúng định dạng")
                      );
                    }
                    if (users.find((u) => u.email === value)) {
                      return Promise.reject(new Error("Email đã tồn tại"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input size="large" placeholder="Địa chỉ Email" />
            </Form.Item>

            <Form.Item<UserForm>
              name="password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
                { min: 8, message: "Mật khẩu phải có tối thiểu 8 ký tự" },
              ]}
            >
              <Input.Password size="large" placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Mật khẩu xác nhận không được để trống",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận phải trùng khớp")
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[100%]"
                size="large"
              >
                Đăng ký
              </Button>
            </Form.Item>

            <div className="text-center">
              <span>Đã có tài khoản?</span>&nbsp;
              <Link to="/login">Đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
