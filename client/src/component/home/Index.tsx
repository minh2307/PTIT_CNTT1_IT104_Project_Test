import { Button, Card } from "antd";
import { FooterTest } from "../manager/Footer.manager";
import { Nav } from "./Nav.home";
import { RandomTest } from "./RandomTest.home";

import testCardImg from "../../assets/testCardImg.png";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useEffect, useMemo, useState } from "react";
import { getAllTests } from "../../apis/test.api";
import type { CategoryType } from "../../interface/category.interface";
import { getAllCategorys } from "../../apis/category.api";
import HomePaination from "./Pagination.home";
import { useDebounce } from "../../hooks/Debounce.hook";
import { Toolbar } from "./Tooldbar.home";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const {
    tests,
    page: pagTest,
    total,
  } = useAppSelector((state) => state.testModal);

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

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    localStorage.removeItem("timeLeft");
  }, []);

  useEffect(() => {
    dispatch(
      getAllTests({
        page: pagTest ?? 1,
        limit: 10,
        search: debouncedSearch,
        sortBy: "playAmount",
        sortDir: sortDir,
      })
    );
    dispatch(getAllCategorys());
  }, [dispatch, debouncedSearch, sortDir]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav onChangeSearch={setSearch}></Nav>
      <div className=" flex-1 mb-4">
        <RandomTest total={total ?? 0} tests={tests ?? []}></RandomTest>
        <div className="mx-[10%] my-5">
          <h1 className="text-xl my-3 text-center">
            ⭐Các bài kiểm tra nổi bật
          </h1>
          <Toolbar handleSort={setSortDir}></Toolbar>
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
                      <Button
                        className="!bg-[#FFC107] text-black w-full h-auto"
                        onClick={() => navigate(`/quizz/${item.id}`)}
                      >
                        Chơi
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <HomePaination></HomePaination>
      </div>
      <FooterTest></FooterTest>
    </div>
  );
};

export default Index;
