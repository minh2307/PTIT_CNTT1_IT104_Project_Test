import { FooterTest } from "../Footer.manager";
import { Nav } from "../Nav.manager";
import { CategoryTable } from "./Table.categoryManager";
import { CategoryTooldbar } from "./Tooldbar.categoryManager";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="mx-[10%] flex-1 py-4">
        <h1 className="font-Roboto text-2xl py-3">Quản lý danh mục</h1>
        <CategoryTooldbar></CategoryTooldbar>
        <CategoryTable></CategoryTable>
      </div>
      <FooterTest></FooterTest>
    </div>
  );
};

export default Index;
