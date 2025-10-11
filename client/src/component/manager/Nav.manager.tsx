import { NavLink } from "react-router-dom";

export const Nav = () => {
  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-[#FFFFFF8C] hover:font-bold hover:text-white"
      : "text-white";

  const logOut = () => {
    localStorage.removeItem("currentUser");
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
