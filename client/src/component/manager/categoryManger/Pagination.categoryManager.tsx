import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { getAllCategorys } from "../../../apis/category.api";
import { setPagination } from "../../../redux/manager/modal/categoryModal.redux";

const CategoryPagination = () => {
  const dispatch = useAppDispatch();
  const { page, total } = useAppSelector((state) => state.categoryModal);

  const PAGE_SIZE = 6;

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
    dispatch(getAllCategorys({ page: newPage, limit: PAGE_SIZE }));
  };

  return (
    <Pagination
      align="center"
      current={page}
      total={total}
      pageSize={PAGE_SIZE}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
};

export default CategoryPagination;
