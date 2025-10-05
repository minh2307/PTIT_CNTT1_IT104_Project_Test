import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import type { CategoryType } from "../../../interface/category.interface";
import CategoryPagination from "./Pagination.categoryManager";

import history from "../../../assets/history.png";
import science from "../../../assets/science.png";
import entertainment from "../../../assets/entertainment.png";
import life from "../../../assets/life.png";
import { useAppDispatch } from "../../../hooks/redux.hook";
import {
  openAdd,
  openDelete,
  openEdit,
} from "../../../redux/manager/categoryModal.redux";

export const CategoryTable = () => {
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
        <div className="flex ">
          <img src={record.categoryImg} alt="" />
          <p className="flex flex flex-wrap content-around ms-3">
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

  const data: CategoryType[] = [
    {
      id: 1,
      categoryName: "Lịch sử",
      categoryImg: history,
    },
    {
      id: 2,
      categoryName: "Khoa học",
      categoryImg: science,
    },
    {
      id: 3,
      categoryName: "Giải trí",
      categoryImg: entertainment,
    },
    {
      id: 4,
      categoryName: "Đời sống",
      categoryImg: life,
    },
    {
      id: 1,
      categoryName: "Lịch sử",
      categoryImg: history,
    },
    {
      id: 2,
      categoryName: "Khoa học",
      categoryImg: science,
    },
    {
      id: 3,
      categoryName: "Giải trí",
      categoryImg: entertainment,
    },
    {
      id: 4,
      categoryName: "Đời sống",
      categoryImg: life,
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
