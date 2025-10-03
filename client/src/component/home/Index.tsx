import { Button, Card } from "antd";
import { FooterTest } from "../manager/Footer.manager";
import { Nav } from "./Nav.home";
import { RandomTest } from "./RandomTest.home";
import { Tooldbar } from "./Tooldbar.home";

import testCardImg from "../../assets/testCardImg.png";
import CategoryPagination from "../manager/categoryManger/Pagination.categoryManager";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav></Nav>
      <div className=" flex-1">
        <RandomTest></RandomTest>
        <div className="mx-[10%] my-5">
          <h1 className="text-xl my-3 text-center">
            ⭐Các bài kiểm tra nổi bật
          </h1>
          <Tooldbar></Tooldbar>
          <div className="">
            <div className="flex gap-2 mt-4">
              <Card className="flex-1">
                <div className="flex">
                  <div className="flex-8">
                    <img src={testCardImg} className="w-full h-full" alt="" />
                  </div>
                  <div className="flex-30 text-center">
                    <p className="text-gray-500 text-xs">🏠 Đời sống</p>
                    <p className="font-sans text-[20px] mt-3 m-2">
                      Thách thức sự hiểu biết của bạn
                    </p>
                    <p className="text-gray-450">15 câu hỏi - 1 lượt chơi</p>
                  </div>
                  <div className="flex-3 flex flex-col-reverse">
                    <Button className="w-10 !bg-[#FFC107]">Chơi</Button>
                  </div>
                </div>
              </Card>
              <Card className="flex-1">
                <div className="flex">
                  <div className="flex-8">
                    <img src={testCardImg} className="w-full h-full" alt="" />
                  </div>
                  <div className="flex-30 text-center">
                    <p className="text-gray-500 text-xs">🏠 Đời sống</p>
                    <p className="font-sans text-[20px] mt-3 m-2">
                      Thách thức sự hiểu biết của bạn
                    </p>
                    <p className="text-gray-450">15 câu hỏi - 1 lượt chơi</p>
                  </div>
                  <div className="flex-3 flex flex-col-reverse">
                    <Button className="w-10 !bg-[#FFC107]">Chơi</Button>
                  </div>
                </div>
              </Card>{" "}
            </div>
          </div>
        </div>
        <CategoryPagination></CategoryPagination>
      </div>
      <FooterTest></FooterTest>
    </div>
  );
};

export default Index;
