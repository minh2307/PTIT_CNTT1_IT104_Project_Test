import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import type { QuestionType } from "../../interface/test.interface";

type Props = {
  setCurrentQuestion: (id: number) => void;
  currentQuestion: number;
  data: QuestionType[];
  time: number;
  length: number;
};

export const TestContent = ({
  currentQuestion,
  data,
  time,
  setCurrentQuestion,
  length,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = data.find((e) => e.idQuestions === currentQuestion);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleCurrentQuestion = (mode: "next" | "prev") => {
    if (!length) return;

    if (mode === "next") {
      if (currentQuestion < length) {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      if (currentQuestion > 1) {
        setCurrentQuestion(currentQuestion - 1);
      }
    }
  };

  // time

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timeLeft");
    return saved ? Number(saved) : time * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("timeLeft");
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
      <div className="bg-white shadow-sm  h-full">
        <div className="px-6 py-4 flex justify-between">
          <h2 className="!text-3xl font-bold text-gray-900 !mt-6">
            {question?.content}
          </h2>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <span>Thời gian: {time}</span>
            <span>
              Còn lại: {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")} phút
            </span>
          </div>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-xl mb-3 text-gray-900">
            Câu hỏi {currentQuestion} trên {length}:
          </h3>
          <p className="mb-5 text-gray-800 text-sm">{question?.content}</p>

          <Radio.Group onChange={handleAnswerChange} value={selectedAnswer}>
            <Space direction="vertical" className="w-full">
              {question?.answers?.map((e) => (
                <Radio value={e.answer} className="text-sm">
                  {e.answer}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          <div className="flex justify-between items-center mt-8 pt-6">
            <Button type="primary" className="!bg-[#198754]" size="middle">
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
