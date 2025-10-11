import { Tag } from "antd";
import { useState } from "react";

type Props = {
  handleSort: (sortDir: "asc" | "desc") => void;
};

export const Toolbar = ({ handleSort }: Props) => {
  const [active, setActive] = useState<"asc" | "desc" | null>(null);

  const handleClick = (dir: "asc" | "desc") => {
    setActive(dir);
    handleSort(dir);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sắp xếp theo:</span>

      <Tag
        color={active === "asc" ? "gold" : undefined}
        style={{ cursor: "pointer" }}
        onClick={() => handleClick("asc")}
      >
        Lượt chơi tăng dần
      </Tag>

      <Tag
        color={active === "desc" ? "gold" : undefined}
        style={{ cursor: "pointer" }}
        onClick={() => handleClick("desc")}
      >
        Lượt chơi giảm dần
      </Tag>
    </div>
  );
};
