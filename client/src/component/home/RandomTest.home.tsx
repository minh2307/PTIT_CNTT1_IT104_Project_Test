import { Button } from "antd";

export const RandomTest = () => {
  return (
    <div className="bg-[#4A3DB5] h-[100px] flex flex-col items-center justify-center gap-3">
      <p className="text-white text-xl flex items-center">
        Hãy thử 1 bài kiểm tra ngẫu nhiên 🎲
      </p>
      <Button className="!bg-[#FFC107]">Play</Button>
    </div>
  );
};
