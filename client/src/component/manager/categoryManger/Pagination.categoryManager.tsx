import React from "react";
import { Pagination } from "antd";

const CategoryPagination: React.FC = () => (
  <>
    <Pagination align="center" defaultCurrent={1} total={50} />
  </>
);

export default CategoryPagination;
