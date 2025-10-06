import { FooterTest } from "../Footer.manager";
import { Nav } from "../Nav.manager";
import { CategoryTable } from "./Table.categoryManager";
import { CategoryTooldbar } from "./Tooldbar.categoryManager";
import { CategoryModal } from "./Modal.categoryManager";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useEffect } from "react";
import { getAllCategorys } from "../../../apis/category.api";

const Index = () => {
  const dispatch = useAppDispatch();
  const {
    categorys: storeCategory,
    error,
    loading,
  } = useAppSelector((state) => state.categoryModal);

  useEffect(() => {
    dispatch(getAllCategorys());
  }, [dispatch]);

  console.log(
    "useAppSelector(state => state.categories) ---",
    storeCategory,
    error,
    loading
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="mx-[10%] flex-1 py-4">
        <h1 className="font-Roboto text-2xl py-3">Quản lý danh mục</h1>
        <CategoryTooldbar></CategoryTooldbar>
        <CategoryTable data={storeCategory}></CategoryTable>
        <CategoryModal />
      </div>
      <FooterTest></FooterTest>
    </div>
  );
};

export default Index;
