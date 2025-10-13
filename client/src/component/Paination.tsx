import { Pagination } from "antd";

type Props = {
  PAGE_SIZE: number;
  page: number;
  total: number;
  handlePageChange: (newPage: number) => void;
};

const Paination = ({ PAGE_SIZE, handlePageChange, page, total }: Props) => {
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

export default Paination;
