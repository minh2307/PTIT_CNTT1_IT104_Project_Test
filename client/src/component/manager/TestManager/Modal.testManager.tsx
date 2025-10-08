import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import type { RootState } from "../../../redux/store.redux";
import { close } from "../../../redux/manager/modal/testModal.redux";
import { deleteTest } from "../../../apis/test.api";

export const ModalAddEdit = () => {
  const dispatch = useAppDispatch();
  const { isOpen, mode, editing } = useAppSelector(
    (state: RootState) => state.testModal
  );

  const handleDelete = () => {
    console.log("Xoá:", editing);
    if (editing?.id) {
      dispatch(deleteTest(editing.id));
    }
    dispatch(close());
  };

  if (mode == "delete") {
    return (
      <div>
        <Modal
          title="Xác nhận xoá"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isOpen}
          onCancel={() => dispatch(close())}
          onOk={handleDelete}
          okButtonProps={{ style: { background: "red", color: "white" } }}
          okText="Xoá"
          cancelText="Huỷ"
          cancelButtonProps={{ style: { background: "gray", color: "white" } }}
        >
          <p>Bạn chắc chắn muốn xoá bài test này?</p>
        </Modal>
      </div>
    );
  }
};
