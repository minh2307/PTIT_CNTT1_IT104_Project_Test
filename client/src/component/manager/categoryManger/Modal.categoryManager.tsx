import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import type { CategoryType } from "../../../interface/category.interface";
import type { RootState } from "../../../redux/store.redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { close } from "../../../redux/manager/modal/categoryModal.redux";

export const CategoryModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, mode, editing } = useAppSelector(
    (state: RootState) => state.categoryModal
  );

  const [form] = Form.useForm<CategoryType>();

  useEffect(() => {
    if (isOpen && mode === "edit" && editing) {
      form.setFieldsValue({
        categoryName: editing.categoryName,
        categoryImg: editing.categoryImg,
      });

      // setTimeout(() => {
      //   form.setFieldsValue({
      //     categoryName: editing.categoryName,
      //     categoryImg: editing.categoryImg,
      //   });
      // }, 0);

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

  const handleFinish = (values: CategoryType) => {
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
  } else {
    return (
      <>
        <Modal
          title={mode === "edit" ? "Sửa danh mục" : "Thêm danh mục"}
          closable={{ "aria-label": "Custom Close Button" }}
          onCancel={() => dispatch(close())}
          onOk={() => form.submit()}
          okText={mode === "edit" ? "Lưu" : "Thêm"}
          open={isOpen}
        >
          <Form
            form={form}
            name="basic"
            onFinish={handleFinish}
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
      </>
    );
  }
};
