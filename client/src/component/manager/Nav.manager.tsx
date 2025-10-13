import { message, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#FFFFFF8C]" : "text-white hover:font-bold";

  const logOut = (e: React.MouseEvent) => {
    e.preventDefault();
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất không?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      onOk() {
        localStorage.clear();
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
      <div className="flex flex-wrap content-around gap-3 text-[12px] ">
        <NavLink to="/manager/category" className={navLinkCls}>
          Danh mục
        </NavLink>
        <NavLink to="/manager/tests" className={navLinkCls}>
          Bài test
        </NavLink>
        <NavLink
          to="/login"
          onClick={logOut}
          className="hover:font-bold text-white"
        >
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
};
