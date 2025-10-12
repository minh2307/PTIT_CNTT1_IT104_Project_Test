import { Pagination } from "antd";
import { getAllTests } from "../../apis/test.api";
import { setPagination } from "../../redux/manager/modal/testModal.redux";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";

const HomePaination = () => {
  const dispatch = useAppDispatch();
  const { page, total } = useAppSelector((state) => state.testModal);

  const PAGE_SIZE = 8;
  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
    dispatch(getAllTests({ page: newPage, limit: PAGE_SIZE }));
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

export default HomePaination;
