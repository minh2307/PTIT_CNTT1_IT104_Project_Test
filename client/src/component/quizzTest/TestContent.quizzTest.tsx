import { Button, Radio, Space, type RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import type { QuestionType } from "../../interface/test.interface";

type Props = {
  setCurrentQuestion: (id: number) => void;
  currentQuestion: number;
  data: QuestionType[];
  time: number;
  length: number;
  onSelectAnswer: (questionIndex: number, answerIndex: number) => void;
  userAnswers?: Record<number, number | null>;
  onFinishTest: () => void;
};

export const TestContent = ({
  currentQuestion,
  data,
  time,
  setCurrentQuestion,
  length,
  onSelectAnswer,
  userAnswers = {},
  onFinishTest,
}: Props) => {
  const questionIndex = currentQuestion - 1;
  const question = data[questionIndex];

  // lưu đáp án được chọn trong câu hiện tại
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    userAnswers[questionIndex] ?? null
  );

  // Cập nhật lại khi đổi câu
  useEffect(() => {
    setSelectedAnswer(userAnswers[questionIndex] ?? null);
    console.log(userAnswers);
  }, [currentQuestion, userAnswers, questionIndex]);

  const handleAnswerChange = (e: RadioChangeEvent) => {
    const answerIndex = Number(e.target.value);
    setSelectedAnswer(answerIndex);
    onSelectAnswer(questionIndex, answerIndex);
  };

  //  Điều hướng câu hỏi
  const handleCurrentQuestion = (mode: "next" | "prev") => {
    if (mode === "next" && currentQuestion < length) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (mode === "prev" && currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Đếm giờ
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timeLeft");
    return saved ? Number(saved) : time * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("timeLeft");
      onFinishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem("timeLeft", next.toString());
        if (next <= 0) {
          clearInterval(timer);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex-1">
      <div className="bg-white shadow-sm h-full">
        <div className="px-6 py-4 flex justify-between">
          <h2 className="!text-3xl font-bold text-gray-900 !mt-6">
            {question?.content}
          </h2>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <span>Thời gian: {time} phút</span>
            <span>
              Còn lại: {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-xl mb-3 text-gray-900">
            Câu hỏi {currentQuestion}/{length}:
          </h3>

          <Radio.Group
            onChange={handleAnswerChange}
            value={selectedAnswer ?? undefined}
          >
            <Space direction="vertical" className="w-full">
              {question?.answers?.map((ans, index) => (
                <Radio key={index} value={index} className="text-sm">
                  {ans.answer}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          <div className="flex justify-between items-center mt-8 pt-6">
            <Button
              type="primary"
              className="!bg-[#198754]"
              size="middle"
              onClick={onFinishTest}
            >
              Hoàn thành
            </Button>
            <Space>
              <Button
                className="!bg-gray-500 hover:!bg-gray-600 !text-white !border-gray-500"
                size="middle"
                onClick={() => handleCurrentQuestion("prev")}
              >
                Trước
              </Button>
              <Button
                type="primary"
                size="middle"
                onClick={() => handleCurrentQuestion("next")}
              >
                Tiếp
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};
