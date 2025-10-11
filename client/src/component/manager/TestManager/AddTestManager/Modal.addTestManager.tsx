import { useState } from "react";
import { Modal, Input, Button, Space, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSave: (question: string, answers: string[]) => void;
};

export const TestModal = ({ open, onCancel, onSave }: Props) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

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
    setAnswers(answers.filter((_, i) => i !== index));
    if (correctIndex === index) setCorrectIndex(null);
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

          <Button className="mt-3" onClick={handleAddAnswer} block>
            Thêm câu trả lời
          </Button>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Huỷ</Button>
          <Button type="primary" onClick={() => onSave(question, answers)}>
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};
