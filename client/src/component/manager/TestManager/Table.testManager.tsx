import { Button, Space, Table, type TableProps } from "antd";

import CategoryPagination from "../categoryManger/Pagination.categoryManager";
import type { TestType } from "../../../interface/test.interface";

import {
  openDelete,
  openEdit,
} from "../../../redux/manager/modal/testModal.redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useEffect, useMemo } from "react";
import { getAllCategorys } from "../../../apis/category.api";

type Props = {
  data: TestType[] | undefined;
};

export const TableTest = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  type Cat = {
    id?: number | string;
    categoryName?: string;
    categoryImg?: string;
  };

  const { categorys: categories } = useAppSelector(
    (state) => state.categoryModal
  );

  useEffect(() => {
    dispatch(getAllCategorys());
  }, [dispatch]);

  const categoryMap = useMemo(() => {
    const obj: Record<string | number, string> = {};
    (categories || []).forEach((c: Cat) => {
      obj[c.id || ""] = c.categoryName || c.categoryImg || "";
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
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img src={record.image} alt={String(record.testName || "image")} />
          <p>{categoryMap[record.categoryId || ""] ?? record.categoryId}</p>
        </div>
      ),
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
            onClick={() => dispatch(openEdit(record))}
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
      <CategoryPagination></CategoryPagination>
    </div>
  );
};
