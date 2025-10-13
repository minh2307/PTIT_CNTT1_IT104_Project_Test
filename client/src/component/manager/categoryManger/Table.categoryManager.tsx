import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import type { CategoryType } from "../../../interface/category.interface";

import { useAppDispatch } from "../../../hooks/redux.hook";
import {
  openDelete,
  openEdit,
  setPagination,
} from "../../../redux/manager/modal/categoryModal.redux";
import Paination from "../../Paination";
import { getAllCategorys } from "../../../apis/category.api";

type Props = {
  data: CategoryType[] | undefined;
  categoryPage: number;
  categoryTotal: number;
};

export const CategoryTable = ({ data, categoryPage, categoryTotal }: Props) => {
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

  // phân trang

  const PAGE_SIZE = 6;

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
    dispatch(getAllCategorys({ page: newPage, limit: PAGE_SIZE }));
  };

  return (
    <>
      <Table<CategoryType>
        columns={columns}
        dataSource={data}
        pagination={false}
        className="my-5"
      />
      <Paination
        PAGE_SIZE={PAGE_SIZE}
        handlePageChange={handlePageChange}
        page={categoryPage}
        total={categoryTotal}
      ></Paination>
    </>
  );
};
