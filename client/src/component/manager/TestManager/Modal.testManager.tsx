import { Form, Input, Modal } from "antd";
import type { TestType } from "../../../interface/test.interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import type { RootState } from "../../../redux/store.redux";
import { useEffect } from "react";
import { close } from "../../../redux/manager/modal/testModal.redux";

export const ModalAddEdit = () => {
  const dispatch = useAppDispatch();
  const { isOpen, mode, editing } = useAppSelector(
    (state: RootState) => state.testModal
  );
  const [form] = Form.useForm<TestType>();

  useEffect(() => {
    if (isOpen && mode === "edit" && editing) {
      form.setFieldsValue({
        testName: editing.testName,
        image: editing.image,
        categoryId: editing.categoryId,
        question: editing.question,
        playTime: editing.playTime,
      });

      console.log("editing (filled)", editing, { isOpen, mode });
    }

    if (!isOpen || mode === "add") {
      form.resetFields();
    }
  }, [isOpen, mode, editing, form]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const handleFinish = (values: TestType) => {
    if (mode === "add") console.log("Thêm:", values);
    else if (mode === "edit") console.log("Sửa:", { ...editing, ...values });

    form.resetFields();
    dispatch(close());
  };

  const onFinishFailed = () => {
    console.log("false");
  };

  const handleDelete = () => {
    console.log("Xoá:", editing);
    dispatch(close());
  };

  if (mode == "delete") {
    return (
      <div>
        <Modal
          title="Xác nhận xoá"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isOpen}
          onCancel={() => dispatch(close())}
          onOk={handleDelete}
          okButtonProps={{ style: { background: "red", color: "white" } }}
          okText="Xoá"
          cancelText="Huỷ"
          cancelButtonProps={{ style: { background: "gray", color: "white" } }}
        >
          <p>Bạn chắc chắn muốn xoá bài test này?</p>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title={mode === "edit" ? "Sửa bài test" : "Thêm bài test"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onCancel={() => dispatch(close())}
        onOk={() => form.submit()}
        okText={mode === "edit" ? "Lưu" : "Thêm"}
      >
        <Form
          name="basic"
          form={form}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item<TestType>
            label="Tên bài test"
            name="testName"
            rules={[{ required: true, message: "Please input test name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TestType>
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Please input test image!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TestType>
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Please input category!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TestType>
            label="Số câu hỏi"
            name="question"
            rules={[
              { required: true, message: "Please input question count!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TestType>
            label="Thời gian (phút)"
            name="playTime"
            rules={[{ required: true, message: "Please input time!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
