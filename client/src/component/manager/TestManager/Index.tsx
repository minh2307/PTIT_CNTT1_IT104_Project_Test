import { Nav } from "../Nav.manager";
import { FooterTest } from "../Footer.manager";
import { TableTest } from "./Table.testManager";
import { ModalAddEdit } from "./Modal.testManager";
import { Button, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { openAdd } from "../../../redux/manager/modal/testModal.redux";
import { useEffect } from "react";
import { getAllTests } from "../../../apis/test.api";

const Index = () => {
  const dispatch = useAppDispatch();
  const {
    tests: storeTest,
    error,
    loading,
  } = useAppSelector((state) => state.testModal);

  useEffect(() => {
    dispatch(getAllTests());
  }, [dispatch]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="mx-[10%] flex-1 py-4">
        <h1 className="font-Roboto text-2xl py-3">Quản lý bài test</h1>
        <div className="flex justify-between my-4">
          <Button type="primary" onClick={() => dispatch(openAdd())}>
            Thêm bài test
          </Button>
          <div className="flex gap-4">
            <Select
              defaultValue="Sắp xếp theo"
              style={{ width: 150 }}
              onChange={handleChange}
              options={[{ value: "jack", label: "Jack" }]}
            />
            <Input placeholder="Tìm kiếm theo tên"></Input>
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
