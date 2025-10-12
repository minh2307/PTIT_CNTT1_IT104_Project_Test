import { useEffect, useState } from "react";
import { Modal, Input, Button, Space, Checkbox, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type {
  AnswersType,
  QuestionType,
} from "../../../../interface/test.interface";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (questionData: QuestionType) => void;
  editData?: QuestionType[];
  questionIdEdit: number;
  modeModal: "add" | "edit";
};

export const TestModal = ({
  open,
  onCancel,
  onSave,
  editData,
  questionIdEdit,
  modeModal,
}: Props) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editData && open && modeModal === "edit") {
      const index = editData.findIndex((e) => e.idQuestions === questionIdEdit);

      const questionData = Array.isArray(editData) ? editData[index] : editData;

      if (!questionData) {
        resetForm();
        return;
      }

      setQuestion(questionData.content ?? "");

      const answerTexts =
        questionData.answers?.map((a: AnswersType) => a.answer) || [];

      while (answerTexts.length < 2) {
        answerTexts.push("");
      }

      setAnswers(answerTexts as string[]);

      const correctIdx =
        questionData.answers?.findIndex((a: AnswersType) => a.isCorrected) ??
        -1;
      setCorrectIndex(correctIdx >= 0 ? correctIdx : null);
    } else {
      resetForm();
    }
  }, [editData, open, questionIdEdit]);

  const resetForm = () => {
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(null);
  };

  const handleSelectCorrect = (index: number) => {
    setCorrectIndex(index);
  };

  const handleAnswerChange = (value: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleDeleteAnswer = (index: number) => {
    if (correctIndex === index) {
      message.warning(
        "Bạn vừa xoá đáp án đúng! Vui lòng chọn lại đáp án đúng."
      );
      setCorrectIndex(null);
    } else if (correctIndex !== null && correctIndex > index) {
      setCorrectIndex(correctIndex - 1);
    }

    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!question.trim()) {
      message.error(" Câu hỏi không được để trống!");
      return;
    }

    if (question.trim().length < 5 || question.trim().length > 200) {
      message.error(" Câu hỏi phải có độ dài từ 5 đến 200 ký tự!");
      return;
    }

    const trimmedAnswers = answers.map((a) => a.trim());
    if (trimmedAnswers.some((a) => !a)) {
      message.error(" Tất cả câu trả lời đều phải được điền!");
      return;
    }

    const invalidLength = trimmedAnswers.some(
      (a) => a.length < 3 || a.length > 100
    );
    if (invalidLength) {
      message.error(" Câu trả lời phải có độ dài từ 3 đến 100 ký tự!");
      return;
    }

    if (correctIndex === null) {
      message.error("Vui lòng chọn 1 câu trả lời đúng!");
      return;
    }

    const questionData: QuestionType = {
      idQuestions: questionIdEdit,
      content: question.trim(),
      answers: trimmedAnswers.map((a, i) => ({
        answer: a,
        ...(correctIndex !== null && i === correctIndex
          ? { isCorrected: true }
          : {}),
      })),
    };

    onSave(questionData);
  };

  return (
    <Modal
      title="Thêm/sửa câu hỏi"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Câu hỏi</label>
          <Input
            placeholder="Nhập câu hỏi"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Câu trả lời</label>
          <Space direction="vertical" className="w-full">
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
                <Checkbox
                  checked={correctIndex === index}
                  onChange={() => handleSelectCorrect(index)}
                />
                <Input
                  placeholder="Nhập câu trả lời"
                  value={answer}
                  onChange={(e) => handleAnswerChange(e.target.value, index)}
                />
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteAnswer(index)}
                />
              </div>
            ))}
          </Space>

          <Button
            className="!my-3 !bg-[#6C757D] !text-white"
            onClick={handleAddAnswer}
          >
            Thêm câu trả lời
          </Button>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Huỷ</Button>
          <Button type="primary" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};
