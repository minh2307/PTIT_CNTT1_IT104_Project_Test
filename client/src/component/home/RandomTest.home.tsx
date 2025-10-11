import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { TestType } from "../../interface/test.interface";

type Prop = {
  total: number;
  tests: TestType[];
};

export const RandomTest = ({ total, tests }: Prop) => {
  const navigate = useNavigate();

  const usedIds = tests.map((e) => e.id);
  let randomTest;

  do {
    randomTest = Math.floor(Math.random() * total);
  } while (!usedIds.includes(randomTest) && randomTest != 0);

  return (
    <div className="bg-[#4A3DB5] h-[100px] flex flex-col items-center justify-center gap-3">
      <p className="text-white text-xl flex items-center">
        Hãy thử 1 bài kiểm tra ngẫu nhiên 🎲
      </p>
      <Button
        className="!bg-[#FFC107]"
        onClick={() => navigate(`/quizz/${randomTest}`)}
      >
        Play
      </Button>
    </div>
  );
};
