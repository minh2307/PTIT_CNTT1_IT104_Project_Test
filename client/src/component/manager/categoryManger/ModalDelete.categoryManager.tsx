import { Button, Modal } from "antd";
import { useState } from "react";

export const ModalDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Xác nhận xoá"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
