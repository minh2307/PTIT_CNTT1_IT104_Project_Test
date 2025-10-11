import { Button, Form, Input, Select, type FormProps } from "antd";
import type { TestType } from "../../../../interface/test.interface";
import { FormTable } from "./Table.addTestManager";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import { addTest, editTest, getAllTests } from "../../../../apis/test.api";
import { getAllCategorys } from "../../../../apis/category.api";
import { TestModal } from "./Modal.addTestManager";
import { ModalDelete } from "./ModalDelete.addTestManger";

export const AddTest = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [questionIdDelete, setQuestionIdDelete] = useState<number>(0);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<TestType>["onFinish"] = (values) => {
    if (id) {
      if (!data || data.length === 0) {
        return;
      }
      const original = {
        categoryId: data[0].categoryId ?? "",
        testName: data[0].testName ?? "",
        playTime: data[0].playTime ?? "",
      };

      const isChanged = Object.keys(values).some(
        (key) => values[key] !== original[key]
      );

      if (!isChanged) {
        console.log("Không có thay đổi");
        return;
      }

      console.log("edit", values);
      dispatch(
        editTest({
          id: Number(id),
          ...values,
          playTime: Number(values.playTime),
          categoryId: Number(values.categoryId),
        })
      );
    } else {
      console.log("add", values);
      dispatch(addTest(values));
    }

    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<TestType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { id } = useParams();
  const { tests } = useAppSelector((state) => state.testModal);
  const { categorys } = useAppSelector((state) => state.categoryModal);

  useEffect(() => {
    dispatch(getAllTests({}));
    dispatch(getAllCategorys());
  }, [dispatch]);

  const data = tests?.filter((e) => e.id === Number(id));

  useEffect(() => {
    if (data && data.length > 0) {
      form.setFieldsValue({
        categoryId: data[0].categoryId ?? "",
        testName: data[0].testName ?? "",
        playTime: data[0].playTime ?? "",
      });
    }
  }, [data]);

  return (
    <div>
      <Form
        form={form}
        name="test-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item<TestType>
          label="Tên bài test"
          name="testName"
          rules={[{ required: true, message: "Vui lòng nhập tên bài test!" }]}
        >
          <Input placeholder="Điền tên bài test" />
        </Form.Item>
        {/* Danh mục và Thời gian */}
        <div className="flex gap-5">
          <Form.Item<TestType>
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              style={{ width: 200 }}
              options={categorys?.map((category) => ({
                value: category.id,
                label: category.categoryName,
              }))}
            />
          </Form.Item>

          <Form.Item<TestType>
            label="Thời gian (phút)"
            name="playTime"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian!" },
              {
                pattern: /^[0-9]+$/,
                message: "Chỉ được nhập số!",
              },
            ]}
          >
            <Input placeholder="15" style={{ width: 100 }} />
          </Form.Item>
        </div>

        {/* Quản lý câu hỏi */}
        <div className="my-4">
          <h1 className="font-bold text-xl">Quản lý câu hỏi</h1>
          <div className="flex justify-between">
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Thêm Câu hỏi
            </Button>
            <Button type="default" htmlType="submit">
              Lưu
            </Button>
          </div>
        </div>
      </Form>
      <FormTable
        data={data}
        handleModal={handleModal}
        isModalDelete={setIsModalDelete}
        questionIdDelete={setQuestionIdDelete}
      ></FormTable>
      <TestModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={(question, answers) => {
          console.log("Câu hỏi:", question);
          console.log("Các đáp án:", answers);
          setIsModalOpen(false);
        }}
      />

      <ModalDelete
        isModal={isModalDelete}
        setIsModal={setIsModalDelete}
        questionIdDelete={questionIdDelete}
        testIdDelete={Number(id)}
      ></ModalDelete>
    </div>
  );
};
