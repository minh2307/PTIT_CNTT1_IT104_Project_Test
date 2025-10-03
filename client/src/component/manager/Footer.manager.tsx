import { Layout } from "antd";
const { Footer } = Layout;

export const FooterTest = () => {
  return (
    <Footer className=" !bg-[#212529] w-full !text-white flex items-center justify-center h-[46px]">
      <h3 className="font-bold text-xs text-center">
        © 2025 Quiz App. All rights reserved.
      </h3>
    </Footer>
  );
};
