import { Modal } from "antd";
import { useAppDispatch } from "../../../../hooks/redux.hook";
import { deleteQuestionTest } from "../../../../apis/test.api";

type Props = {
  isModal: boolean;
  setIsModal: (c: boolean) => void;
  testIdDelete: number;
  questionIdDelete: number;
};

export const ModalDelete = ({
  setIsModal,
  isModal,
  testIdDelete,
  questionIdDelete,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(
      deleteQuestionTest({ id: testIdDelete, questionId: questionIdDelete })
    );
    setIsModal(false);
  };

  return (
    <div>
      <Modal
        title="Xác nhận xoá"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModal}
        onCancel={() => setIsModal(false)}
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
};
