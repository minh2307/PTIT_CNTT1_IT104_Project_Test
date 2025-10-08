import { Form, Input, Modal, Upload, notification, Button, Spin } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

import type { CategoryType } from "../../../interface/category.interface";
import type { RootState } from "../../../redux/store.redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { close } from "../../../redux/manager/modal/categoryModal.redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "../../../apis/category.api";

export const CategoryModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, mode, editing } = useAppSelector(
    (state: RootState) => state.categoryModal
  );

  const [form] = Form.useForm<CategoryType>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loadingImg, setLoadingImg] = useState(false); // 🌀 Trạng thái loading khi upload ảnh

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const allCategorys = useAppSelector(
    (state: RootState) => state.categoryModal.categorys
  );

  useEffect(() => {
    if (isOpen && mode === "edit" && editing) {
      form.setFieldsValue({
        categoryName: editing.categoryName,
        categoryImg: editing.categoryImg,
      });

      if (editing.categoryImg) {
        setFileList([
          {
            uid: "-1",
            name: "image",
            status: "done",
            url: editing.categoryImg,
          },
        ]);
      }
    }

    if (!isOpen || mode === "add") {
      form.resetFields();
      setFileList([]);
    }
  }, [isOpen, mode, editing, form]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setFileList([]);
    }
  }, [isOpen, form]);

  const handleFinish = (values: CategoryType) => {
    if (mode === "add") {
      dispatch(
        addCategory({
          categoryName: values.categoryName ?? "",
          categoryImg: values.categoryImg ?? "",
        })
      );
    } else if (mode === "edit") {
      dispatch(
        editCategory({
          id: editing?.id ?? 0,
          categoryName: values.categoryName ?? "",
          categoryImg: values.categoryImg ?? "",
        })
      );
    }

    form.resetFields();
    setFileList([]);
    dispatch(close());
  };

  const handleDelete = () => {
    dispatch(deleteCategory(editing?.id ?? 0));
    setFileList([]);
    dispatch(close());
  };

  if (mode === "delete") {
    return (
      <Modal
        title="Xác nhận xoá"
        open={isOpen}
        onCancel={() => dispatch(close())}
        onOk={handleDelete}
        okButtonProps={{ style: { background: "red", color: "white" } }}
        okText="Xoá"
        cancelText="Huỷ"
        cancelButtonProps={{ style: { background: "gray", color: "white" } }}
      >
        <p>Bạn chắc chắn muốn xoá danh mục này?</p>
      </Modal>
    );
  }

  return (
    <Modal
      title={mode === "edit" ? "Sửa danh mục" : "Thêm danh mục"}
      onCancel={() => dispatch(close())}
      onOk={() => form.submit()}
      okText={mode === "edit" ? "Lưu" : "Thêm"}
      open={isOpen}
    >
      <Form
        form={form}
        name="basic"
        onFinish={handleFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item<CategoryType>
          label="Tên danh mục"
          name="categoryName"
          rules={[
            { required: true, message: "Tên danh mục không được để trống!" },
            { min: 3, message: "Tên danh mục phải có ít nhất 3 ký tự" },
            {
              validator: async (_, value) => {
                if (!value) return Promise.resolve();
                const cate = allCategorys?.find(
                  (c) => c.categoryName === value
                );
                if (cate && !value) {
                  return Promise.reject("Tên danh mục đã tồn tại");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CategoryType>
          label="Hình ảnh danh mục"
          name="categoryImg"
          rules={[{ required: true, message: "Vui lòng tải hình ảnh!" }]}
        >
          <Spin
            spinning={loadingImg}
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          >
            <Upload
              accept="image/*"
              listType="picture"
              fileList={fileList}
              onRemove={() => {
                setFileList([]);
                form.setFieldsValue({ categoryImg: "" });
              }}
              customRequest={(options) => {
                const { file, onSuccess, onError } = options as unknown as {
                  file: File;
                  onSuccess?: (res?: unknown) => void;
                  onError?: (err?: unknown) => void;
                };

                (async () => {
                  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
                    notification.error({
                      message: "Cloudinary chưa được cấu hình",
                      description:
                        "Hãy kiểm tra biến môi trường VITE_CLOUD_NAME và VITE_UPLOAD_PRESET",
                    });
                    return onError?.(new Error("Cloudinary not configured"));
                  }

                  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                  setLoadingImg(true);

                  try {
                    const resp = await fetch(url, {
                      method: "POST",
                      body: formData,
                    });
                    const data = await resp.json();

                    if (data.secure_url) {
                      form.setFieldsValue({ categoryImg: data.secure_url });
                      setFileList([
                        {
                          uid: data.public_id || "-1",
                          name: file.name,
                          status: "done",
                          url: data.secure_url,
                        },
                      ]);
                      notification.success({ message: "Upload thành công!" });
                      onSuccess?.(data);
                    } else {
                      throw new Error("Không nhận được secure_url");
                    }
                  } catch (err) {
                    notification.error({
                      message: "Upload lỗi",
                      description: String(err),
                    });
                    onError?.(err as Error);
                  } finally {
                    setLoadingImg(false);
                  }
                })();
              }}
            >
              <Button
                icon={loadingImg ? <LoadingOutlined /> : <UploadOutlined />}
                disabled={loadingImg}
              >
                {loadingImg ? "Đang tải ảnh..." : "Tải ảnh lên"}
              </Button>
            </Upload>
          </Spin>
        </Form.Item>
      </Form>
    </Modal>
  );
};
