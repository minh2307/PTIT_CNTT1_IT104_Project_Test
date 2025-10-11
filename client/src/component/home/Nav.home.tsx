import { Input } from "antd";
import { NavLink } from "react-router-dom";

type Prop = {
  onChangeSearch: (s: string) => void;
};

export const Nav = ({ onChangeSearch }: Prop) => {
  const logOut = () => {
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="bg-[#212529] text-white flex justify-between px-5 h-[49px]">
      <h3 className="font-bold text-xl flex flex-wrap content-around">
        QuizzForge
      </h3>
      <div className="flex-wrap content-around">
        <Input
          placeholder="Tìm kiếm bài test"
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap content-around gap-3 text-[12px] ">
        <NavLink to="/" className={" text-white"}>
          Trang chủ
        </NavLink>
        <NavLink
          to="/login"
          onClick={logOut}
          className={"hover:font-bold text-white"}
        >
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
};
