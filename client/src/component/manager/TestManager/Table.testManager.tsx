import { Button, Space, Table, type TableProps } from "antd";

import history from "../../../assets/history.png";
import science from "../../../assets/science.png";
import entertainment from "../../../assets/entertainment.png";
import life from "../../../assets/life.png";
import CategoryPagination from "../categoryManger/Pagination.categoryManager";

export const TableTest = () => {
  interface DataType {
    id: number;
    name: string;
    category: string;
    question: number;
    time: number;
    img?: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Tên bài test",
      dataIndex: "name",
      key: "name",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
      render: (_, record) => (
        <div>
          <img src={record.img} alt="" />
          <p>{record.category}</p>
        </div>
      ),
    },
    {
      title: "Số câu hỏi",
      dataIndex: "question",
      key: "question",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
      render: (_, record) => <p>{record.time} min</p>,
    },
    {
      title: "Hành động",
      key: "action",
      width: "100px",
      render: (_, record) => (
        <Space size="middle">
          <Button className="!bg-[#FFC107]">Sửa</Button>
          <Button className="!bg-[#DC3545] !text-white ">Xoá</Button>
        </Space>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
  ];

  const data: DataType[] = [
    {
      id: 1,
      name: "History Quiz",
      category: "Lịch sử",
      question: 15,
      time: 10,
      img: history,
    },
    {
      id: 2,
      name: "Science Challenge",
      category: "Khoa học",
      question: 20,
      time: 15,
      img: science,
    },
    {
      id: 3,
      name: "Entertainment Trivia",
      category: "Giải trí",
      question: 10,
      time: 5,
      img: entertainment,
    },
    {
      id: 4,
      name: "Entertainment Trivia",
      category: "Đời sống",
      question: 10,
      time: 5,
      img: life,
    },
    {
      id: 5,
      name: "Entertainment Trivia",
      category: "Đời sống",
      question: 10,
      time: 5,
      img: life,
    },
    {
      id: 6,
      name: "Entertainment Trivia",
      category: "Đời sống",
      question: 10,
      time: 5,
      img: life,
    },
    {
      id: 7,
      name: "Entertainment Trivia",
      category: "Đời sống",
      question: 10,
      time: 5,
      img: life,
    },
    {
      id: 8,
      name: "Entertainment Trivia",
      category: "Đời sống",
      question: 10,
      time: 5,
      img: life,
    },
  ];

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        className="my-5"
      />
      <CategoryPagination></CategoryPagination>
    </div>
  );
};
