import { NavLink } from "react-router-dom";

export const Nav = () => {
  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#FFFFFF8C]" : "text-white hover:font-bold";

  return (
    <div className="bg-[#212529] text-white flex justify-between px-5 h-[49px]">
      <h3 className="font-bold text-xl flex flex-wrap content-around">
        QuizzForge
      </h3>
      <div className="flex flex-wrap content-around gap-3 text-[12px] ">
        <NavLink to="/category" className={navLinkCls}>
          Danh mục
        </NavLink>
        <NavLink to="/test" className={navLinkCls}>
          Bài test
        </NavLink>
        <NavLink to="/" className={navLinkCls}>
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
};
