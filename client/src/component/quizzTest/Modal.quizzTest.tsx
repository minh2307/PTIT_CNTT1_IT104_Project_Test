import { Button, Card, Modal } from "antd";
import { useNavigate } from "react-router-dom";

type Prop = {
  questionLength: number;
  setIsModalOpen: (v: boolean) => void;
  isModalOpen: boolean;
  correctCount: number;
};

export const QuizzModal = ({
  questionLength,
  setIsModalOpen,
  isModalOpen,
  correctCount,
}: Prop) => {
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const percent = Math.round((correctCount / questionLength) * 100);

  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="border-y-1 border-zinc-300   mt-8">
          <h1 className="text-3xl text-center p-3">Hoàn thành</h1>
          <Card
            className="!bg-[#b2dbc9] !mb-5 !py-4"
            bodyStyle={{ padding: 0 }}
          >
            <h2 className="text-2xl text-center">Chúc mừng!</h2>
            <p className="text-center text-[15px]">
              Bạn đã hoàn thành bài kiểm tra
            </p>
            <hr />
            <h2 className="text-center !mt-3 text-[15px]">
              Điểm của bạn: {percent}%
            </h2>
          </Card>
          <Card className="!mb-4 !pb-4" bodyStyle={{ padding: 0 }}>
            <div className="border-b-1 !pt-4 bg-[#21252908]">
              <h2 className="text-2xl  text-center">Kết quả cụ thể</h2>
            </div>
            <div className="text-[15px]">
              <p className="text-center !mt-2">
                <span className="font-bold">Tổng số câu hỏi:</span>{" "}
                {questionLength}
              </p>
              <p className="text-center">
                <span className="font-bold">Câu trả lời đúng:</span>{" "}
                {correctCount}
              </p>
              <p className="text-center">
                <span className="font-bold">Câu trả lời sai:</span>{" "}
                {questionLength - correctCount}
              </p>
            </div>
          </Card>
        </div>
        <div className="flex justify-end gap-4 my-5">
          <Button
            type="primary"
            onClick={() => {
              localStorage.removeItem("timeLeft");
              window.location.reload();
            }}
          >
            Làm lại
          </Button>
          <Button
            className="!text-white !bg-[#198754]"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </Button>
        </div>
      </Modal>
    </>
  );
};
