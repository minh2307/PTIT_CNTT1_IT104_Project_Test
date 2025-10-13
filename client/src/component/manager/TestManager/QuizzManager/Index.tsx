import { FooterTest } from "../../Footer.manager";
import { Nav } from "../../Nav.manager";
import { QuizzContext } from "./QuizzContext.QuizzManager";

const Index = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav></Nav>
        <div className="mx-[10%] flex-1 py-4">
          <h1 className="font-bold text-3xl ">Tạo bài test</h1>
          <QuizzContext></QuizzContext>
        </div>

        <FooterTest></FooterTest>
      </div>
    </>
  );
};

export default Index;
