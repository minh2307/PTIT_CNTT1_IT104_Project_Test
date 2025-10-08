import { Button, Card } from "antd";
import { FooterTest } from "../manager/Footer.manager";
import { Nav } from "./Nav.home";
import { RandomTest } from "./RandomTest.home";
import { Tooldbar } from "./Tooldbar.home";

import testCardImg from "../../assets/testCardImg.png";

import CategoryPagination from "../manager/categoryManger/Pagination.categoryManager";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useEffect, useMemo } from "react";
import { getAllTests } from "../../apis/test.api";
import type { CategoryType } from "../../interface/category.interface";
import { getAllCategorys } from "../../apis/category.api";

const Index = () => {
  const dispatch = useAppDispatch();

  const { tests } = useAppSelector((state) => state.testModal);

  const { categorys: categories } = useAppSelector(
    (state) => state.categoryModal
  );

  const categoryMap = useMemo(() => {
    const obj: Record<string | number, string> = {};
    (categories || []).forEach((c: CategoryType) => {
      obj[c.id || ""] = c.categoryName || c.categoryImg || "";
    });

    return obj;
  }, [categories]);

  useEffect(() => {
    dispatch(getAllTests());
    dispatch(getAllCategorys());
  }, [dispatch]);

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
            <div className="flex gap-4 mt-4 flex-wrap">
              {tests?.map((item) => (
                <Card
                  key={item.id}
                  bodyStyle={{ padding: 0 }}
                  className="w-full sm:w-[48%] shadow-md !p-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-1/5">
                      <img
                        src={testCardImg}
                        className="w-full h-auto rounded-md object-cover"
                        alt=""
                      />
                    </div>

                    <div className="w-2/3 text-center">
                      <p className="text-gray-500 text-xs">
                        🏠{" "}
                        {categoryMap[item.categoryId || ""] ?? item.categoryId}
                      </p>
                      <p className="text-xl mt-2">{item.testName}</p>
                      <p className="text-gray-500 text-sm">
                        {item.questions?.length ?? item.question ?? 0} câu hỏi -{" "}
                        {item.playAmount} lượt chơi
                      </p>
                    </div>

                    <div className="w-1/12 flex flex-col justify-end">
                      <Button className="!bg-[#FFC107] text-black w-full h-auto">
                        Chơi
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
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
