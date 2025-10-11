import { Button, Space, Table, type TableProps } from "antd";
import TestPaination from "./Paination.testManager";
import type { TestType } from "../../../interface/test.interface";

import { openDelete } from "../../../redux/manager/modal/testModal.redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useEffect, useMemo } from "react";
import { getAllCategorys } from "../../../apis/category.api";
import type { CategoryType } from "../../../interface/category.interface";
import { useNavigate } from "react-router-dom";

type Props = {
  data: TestType[] | undefined;
};

export const TableTest = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categorys: categories, page } = useAppSelector(
    (state) => state.categoryModal
  );

  useEffect(() => {
    dispatch(getAllCategorys({ page: page ?? 1, limit: 10 }));
  }, [dispatch]);

  const categoryMap = useMemo(() => {
    const obj: Record<string | number, { name: string; img: string }> = {};

    (categories || []).forEach((c: CategoryType) => {
      obj[c.id || ""] = {
        name: c.categoryName || "",
        img: c.categoryImg || "",
      };
    });

    return obj;
  }, [categories]);

  const columns: TableProps<TestType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "5%" },
      }),
    },
    {
      title: "Tên bài test",
      dataIndex: "testName",
      key: "testName",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "25%" },
      }),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "20%" },
      }),
      render: (_, record) => {
        const category = categoryMap[record.categoryId || ""];

        return (
          <div className="flex items-center gap-2">
            <img src={category.img} alt={String(record.testName || "image")} />
            <p>{category.name ?? record.categoryId}</p>
          </div>
        );
      },
    },
    {
      title: "Số câu hỏi",
      dataIndex: "question",
      key: "question",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "10%" },
      }),
      render: (_, record) => (
        <p>{record.questions?.length ?? record.question ?? 0}</p>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "10%" },
      }),
      render: (_, record) => <p>{record.playTime} min</p>,
    },
    {
      title: "Hành động",
      key: "action",
      width: "100px",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="!bg-[#FFC107]"
            onClick={() => navigate(`/manager/tests/edit/${record.id}`)}
          >
            Sửa
          </Button>
          <Button
            className="!bg-[#DC3545] !text-white "
            onClick={() => dispatch(openDelete(record))}
          >
            Xoá
          </Button>
        </Space>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff", width: "10%" },
      }),
    },
  ];

  return (
    <div>
      <Table<TestType>
        columns={columns}
        dataSource={data}
        pagination={false}
        className="my-5"
      />
      <TestPaination></TestPaination>
    </div>
  );
};
