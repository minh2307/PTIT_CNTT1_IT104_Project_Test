import { Button, Card, Form, Input, type FormProps } from "antd";
import type { UserForm } from "../interface/user.interface";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish: FormProps<UserForm>["onFinish"] = (values) => {
    console.log("Success:", values);
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
          chóng và hiệu quả!{" "}
        </div>
        <Card>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item<UserForm>
              name="fullName"
              rules={[
                { required: true, message: "Please input your FullName!" },
              ]}
            >
              <Input
                size="large"
                className="placeholder:text-center"
                placeholder="Họ và Tên"
              />
            </Form.Item>
            <Form.Item<UserForm>
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                size="large"
                className="placeholder:text-center"
                placeholder="Địa chỉ Email"
              />
            </Form.Item>

            <Form.Item<UserForm>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                className="[&>input]:placeholder:text-center"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item<UserForm>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                className="[&>input]:placeholder:text-center"
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[100%]"
                size="large"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <div className="text-center">
              <span>Đã có tài khoản?</span>
              &nbsp;
              <Link to="/">Đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
