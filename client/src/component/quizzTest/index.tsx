import { useEffect, useState } from "react";
import { Nav } from "../home/Nav.home";
import { FooterTest } from "../manager/Footer.manager";
import { Sidebar } from "./Sidebar.quizzTest";
import { TestContent } from "./TestContent.quizzTest";
import { QuizzModal } from "./Modal.quizzTest";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getAllTests, updatePlayAmount } from "../../apis/test.api";

const QuizTestPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { tests } = useAppSelector((state) => state.testModal);

  useEffect(() => {
    dispatch(getAllTests({}));
  }, [dispatch]);

  const data = tests?.find((e) => e.id === Number(id));

  const questionLeng = data?.questions?.length ?? 0;

  useEffect(() => {
    if (data?.playTime != null) {
      localStorage.setItem("time", data.playTime.toString());
    }
  }, [data]);

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  //check kết quả question
  const handleFinishTest = () => {
    if (!data?.questions?.length) return;

    let correct = 0;

    data.questions.forEach((q, i) => {
      const userChoice = userAnswers[i];
      const correctIndex = q.answers?.findIndex((a) => a.isCorrected);

      if (userChoice != null && correctIndex === userChoice) {
        correct++;
      }
    });

    dispatch(updatePlayAmount(Number(id)));

    setCorrectCount(correct);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e9ecef]">
      <Nav onChangeSearch={setSearchTerm} />
      <div className="flex-1 p-[24px] border-e-4">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-stretch">
            <Sidebar
              length={questionLeng}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              userAnswers={userAnswers}
            ></Sidebar>
            <TestContent
              setCurrentQuestion={setCurrentQuestion}
              currentQuestion={currentQuestion}
              data={data?.questions ?? []}
              time={data?.playTime ?? 0}
              length={questionLeng}
              onSelectAnswer={handleSelectAnswer}
              userAnswers={userAnswers}
              onFinishTest={handleFinishTest}
            ></TestContent>
          </div>
        </div>
      </div>
      <QuizzModal
        questionLength={questionLeng}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        correctCount={correctCount}
      ></QuizzModal>
      <FooterTest></FooterTest>
    </div>
  );
};

export default QuizTestPage;
