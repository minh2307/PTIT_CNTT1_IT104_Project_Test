import { Button, Form, Input, Modal, type FormProps } from "antd";
import { useState } from "react";
import type { CategoryType } from "../../../interface/category.interface";

export const CategoryTooldbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CategoryType>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<CategoryType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<CategoryType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm danh mục
      </Button>
      <Modal
        title="Thêm/Sửa danh mục"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item<CategoryType>
            label="Tên danh mục"
            name="categoryName"
            rules={[
              { required: true, message: "Please input your category name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CategoryType>
            label="Hình ảnh danh mục"
            name="categoryImg"
            rules={[
              { required: true, message: "Please input your category img!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
