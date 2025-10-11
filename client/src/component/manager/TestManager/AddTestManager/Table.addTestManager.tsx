import { Button, Space, Table, type TableProps } from "antd";
import type {
  QuestionType,
  TestType,
} from "../../../../interface/test.interface";
import { useMemo } from "react";

type Prop = {
  data?: TestType[];
  handleModal: () => void;
};

export const FormTable = ({ data, handleModal }: Prop) => {
  const rows = useMemo(() => {
    if (!data?.[0]?.questions) return [];
    return data[0].questions.map((q, i) => ({
      key: i,
      ...q,
    }));
  }, [data]);

  const columns: TableProps<QuestionType>["columns"] = [
    {
      title: "ID",
      dataIndex: "idQuestions",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Câu hỏi",
      key: "question",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
      render: (_, record) => <div>{record.content}</div>,
    },
    {
      title: "Hành động",
      key: "action",
      width: "100px",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="!bg-[#FFC107]"
            onClick={() => {
              handleModal();
              console.log("Sửa:", record);
            }}
          >
            Sửa
          </Button>
          <Button
            className="!bg-[#DC3545] !text-white"
            onClick={() => {
              console.log("Xoá:", record);
            }}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<QuestionType>
      columns={columns}
      dataSource={rows}
      pagination={false}
      className="my-5"
      locale={{
        emptyText: "Chưa có câu hỏi nào. Vui lòng thêm câu hỏi.",
      }}
    />
  );
};
