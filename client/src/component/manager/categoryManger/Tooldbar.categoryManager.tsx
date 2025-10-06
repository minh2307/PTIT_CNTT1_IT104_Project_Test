import { Button } from "antd";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { openAdd } from "../../../redux/manager/modal/categoryModal.redux";

export const CategoryTooldbar = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button type="primary" onClick={() => dispatch(openAdd())}>
        Thêm danh mục
      </Button>
    </div>
  );
};
