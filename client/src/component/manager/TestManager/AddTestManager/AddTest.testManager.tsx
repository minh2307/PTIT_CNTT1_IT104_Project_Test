import { Button, Form, Input, message, Select, type FormProps } from "antd";
import type { TestType } from "../../../../interface/test.interface";
import { FormTable } from "./Table.addTestManager";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.hook";
import {
  addQuestionTest,
  addTest,
  editTest,
  getAllTests,
  updateQuestionTest,
} from "../../../../apis/test.api";
import { getAllCategorys } from "../../../../apis/category.api";
import { TestModal } from "./Modal.addTestManager";
import { ModalDelete } from "./ModalDelete.addTestManger";

export const AddTest = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [questionIdDelete, setQuestionIdDelete] = useState<number>(0);
  const [questionIdEdit, setQuestionIdEdit] = useState<number>(0);
  const [modeModal, setModeModal] = useState<"add" | "edit">("add");
  const [testId, setTestId] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    setTestId(Number(id));
  }, []);

  const { tests } = useAppSelector((state) => state.testModal);
  const { categorys } = useAppSelector((state) => state.categoryModal);

  const data = tests?.filter((e) => e.id === testId);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<TestType>["onFinish"] = async (values) => {
    if (id) {
      if (!data || data.length === 0) {
        return;
      }
      const original = {
        categoryId: data[0].categoryId ?? "",
        testName: data[0].testName ?? "",
        playTime: data[0].playTime ?? "",
      };

      // so sánh giá trị cũ với mới
      const isChanged = Object.keys(values).some(
        (key) => values[key] !== original[key]
      );

      if (!isChanged) {
        message.info("Không có thay đổi");
        return;
      }

      dispatch(
        editTest({
          id: testId,
          ...values,
          playTime: Number(values.playTime),
          categoryId: Number(values.categoryId),
        })
      );
    } else {
      const payload = {
        ...values,
        playTime: Number(values.playTime),
        playAmount: 0,
        categoryId: Number(values.categoryId),
      };

      const res = await dispatch(addTest(payload)).unwrap();

      if (res?.id) {
        message.success("Tạo test thành công");
        setTestId(res.id);
      }
    }
  };

  const onFinishFailed: FormProps<TestType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getAllTests({}));
    dispatch(getAllCategorys());
  }, [dispatch]);

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
          rules={[
            { required: true, message: "Vui lòng nhập tên bài test!" },
            {
              min: 3,
              message: "Tên bài test phải dài hơn 3 ký tự   ",
            },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();

                const isDuplicate = tests?.some(
                  (t) =>
                    t.id !== testId &&
                    t.testName?.trim().toLowerCase() ===
                      value.trim().toLowerCase()
                );

                if (isDuplicate) {
                  return Promise.reject(
                    new Error("Tên bài test không được trùng nhau!")
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
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
              {
                validator: (_, value) => {
                  if (value && Number(value) > 120) {
                    return Promise.reject(
                      new Error("Bài test không được quá 120 phút!")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Time" style={{ width: 100 }} />
          </Form.Item>
        </div>

        {/* Quản lý câu hỏi */}
        <div className="my-4">
          <h1 className="font-bold text-xl">Quản lý câu hỏi</h1>
          <div className="flex justify-between">
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
                setModeModal("add");
              }}
            >
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
        setQuestionIdEdit={setQuestionIdEdit}
        setModeModal={setModeModal}
      ></FormTable>
      <TestModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={(questionData) => {
          if (modeModal === "edit") {
            dispatch(
              updateQuestionTest({ id: testId, question: questionData })
            );
          } else {
            dispatch(
              addQuestionTest({ id: testId, newQuestion: questionData })
            );
          }

          setIsModalOpen(false);
        }}
        editData={data?.[0]?.questions ?? []}
        questionIdEdit={questionIdEdit}
        modeModal={modeModal}
      />

      <ModalDelete
        isModal={isModalDelete}
        setIsModal={setIsModalDelete}
        questionIdDelete={questionIdDelete}
        testIdDelete={testId}
      ></ModalDelete>
    </div>
  );
};
