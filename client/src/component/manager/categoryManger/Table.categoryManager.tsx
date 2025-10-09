import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import type { CategoryType } from "../../../interface/category.interface";
import CategoryPagination from "./Pagination.categoryManager";

import { useAppDispatch } from "../../../hooks/redux.hook";
import {
  openDelete,
  openEdit,
} from "../../../redux/manager/modal/categoryModal.redux";

type Props = {
  data: CategoryType[] | undefined;
};

export const CategoryTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Tên danh mục",
      key: "categoryName",
      render: (_, record) => (
        <div className="flex">
          <img src={record.categoryImg} alt="" className="w-[38px] h-[38px]" />
          <p className="flex flex-wrap content-around ms-3">
            {record.categoryName}
          </p>
        </div>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
    {
      title: "Hành động",
      key: "action",
      width: "100px",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="!bg-[#FFC107]"
            onClick={() => {
              dispatch(openEdit(record));
              console.log("edit", record);
            }}
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
        style: { backgroundColor: "#1f2937", color: "#fff" },
      }),
    },
  ];

  return (
    <>
      <Table<CategoryType>
        columns={columns}
        dataSource={data}
        pagination={false}
        className="my-5"
      />
      <CategoryPagination></CategoryPagination>
    </>
  );
};
