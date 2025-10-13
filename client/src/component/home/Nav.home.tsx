import { Input, message, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

type Prop = {
  onChangeSearch: (s: string) => void;
};

export const Nav = ({ onChangeSearch }: Prop) => {
  const navigate = useNavigate();

  const logOut = (e: React.MouseEvent) => {
    e.preventDefault();
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất không?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      onOk() {
        localStorage.removeItem("currentUser");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      },
      onCancel() {
        message.success("Hủy đăng xuất");
      },
    });
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
