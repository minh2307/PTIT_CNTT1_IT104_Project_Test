import { Nav } from "../Nav.manager";
import { FooterTest } from "../Footer.manager";
import { TableTest } from "./Table.testManager";
import { ModalAddEdit } from "./Modal.testManager";
import { Button, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useEffect, useState } from "react";
import { getAllTests } from "../../../apis/test.api";
import { getAllCategorys } from "../../../apis/category.api";
import { useDebounce } from "../../../hooks/Debounce.hook";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tests: storeTest, page } = useAppSelector((state) => state.testModal);
  const [sortBy, setSortBy] = useState<"time" | "name">("time");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      getAllTests({
        page: page ?? 1,
        limit: 10,
        sortBy: sortBy === "name" ? "testName" : "playTime",
        sortDir,
        search: debouncedSearch,
      })
    );
    dispatch(getAllCategorys());
  }, [dispatch, page, sortBy, debouncedSearch, sortDir]);

  console.log(storeTest);

  const handleChange = (value: string) => {
    if (value == "time_asc") {
      setSortBy("time");
      setSortDir("asc");
    } else if (value == "time_desc") {
      setSortBy("time");
      setSortDir("desc");
    } else if (value == "name_asc") {
      setSortBy("name");
      setSortDir("asc");
    } else {
      setSortBy("name");
      setSortDir("desc");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="mx-[10%] flex-1 py-4">
        <h1 className="font-Roboto text-2xl py-3">Quản lý bài test</h1>
        <div className="flex justify-between my-4">
          <Button type="primary" onClick={() => navigate(`/manager/tests/add`)}>
            Thêm bài test
          </Button>
          <div className="flex gap-4">
            <Select
              defaultValue="Sắp xếp theo"
              style={{ width: 200 }}
              onChange={handleChange}
              options={[
                { value: "name_asc", label: "Tên bài test A → Z" },
                { value: "name_desc", label: "Tên bài test Z → A" },
                { value: "time_asc", label: "Thời gian ↑" },
                { value: "time_desc", label: "Thời gian ↓" },
              ]}
            />
            <Input
              placeholder="Tìm kiếm theo tên"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></Input>
          </div>
        </div>
        <TableTest data={storeTest}></TableTest>
        <ModalAddEdit />
      </div>
      <FooterTest></FooterTest>
    </div>
  );
};

export default Index;
