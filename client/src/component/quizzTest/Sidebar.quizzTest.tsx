import { Button } from "antd";

type Props = {
  length: number;
  setCurrentQuestion: (id: number) => void;
  currentQuestion: number;
  userAnswers: Record<number, number | null>;
};

export const Sidebar = ({
  length,
  currentQuestion,
  setCurrentQuestion,
  userAnswers,
}: Props) => {
  const questions = Array.from({ length }, (_, i) => i + 1);

  return (
    <div className="w-48" style={{ height: "200px" }}>
      <div className="bg-white p-4 shadow-sm">
        <h3 className="font-bold text-2xl mb-4">Điều hướng nhanh</h3>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {questions.map((num) => {
            const isCurrent = num === currentQuestion;
            const isAnswered = userAnswers[num - 1] != null;

            return (
              <Button
                key={num}
                className={`!w-10 !h-10 !p-0 flex items-center justify-center text-sm font-medium rounded-md !border-0
                ${
                  isCurrent
                    ? "!bg-blue-600 !text-white"
                    : isAnswered
                    ? "!bg-[#198754]  !text-white"
                    : "!bg-gray-100 !border-gray-300 hover:!bg-blue-600 !hover:text-white "
                }`}
                onClick={() => setCurrentQuestion(num)}
              >
                {num}
              </Button>
            );
          })}
        </div>

        <div className="text-xs text-gray-600 pt-3 pb-6 border-gray-200">
          Lưu ý: Bạn tạ danh sách câu hỏi bạn có thể sử dụng để điều hướng.
        </div>
      </div>
    </div>
  );
};
