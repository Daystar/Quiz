import React, {
  useState,
  useEffect,
} from "react";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import Timer from "./components/Timer";
import OverviewPanel from "./components/OverviewPanel";
import ReportPage from "./components/ReportPage";

const App = () => {
  const [isEmailSubmitted, setIsEmailSubmitted] =
    useState(false);
  const [isQuizStarted, setIsQuizStarted] =
    useState(false);
  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(
    Array(15).fill("")
  );
  const [currentView, setCurrentView] =
    useState("quiz");

  useEffect(() => {
    if (isQuizStarted && isEmailSubmitted) {
      fetchQuizQuestions();
    }
  }, [isQuizStarted, isEmailSubmitted]);

  const fetchQuizQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=15"
      );
      const data = await response.json();
      const formattedQuestions = formatQuestions(
        data.results
      );
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error(
        "Error fetching quiz questions:",
        error
      );
    }
  };

  const formatQuestions = (questionsData) => {
    return questionsData.map((questionData) => ({
      question: questionData.question,
      choices: [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ],
      correctAnswer: questionData.correct_answer,
      visited: false,
      attempted: false,
    }));
  };

  const handleQuestionChange = (choice) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] =
      choice;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = (choice) => {
    handleQuestionChange(choice);
    setCurrentQuestionIndex(
      currentQuestionIndex + 1
    );
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNext = (choice) => {
    handleQuestionChange(choice);
    setCurrentQuestionIndex(
      currentQuestionIndex + 1
    );
  };

  const handleTimerEnd = () => {
    const updatedQuestions = questions.map(
      (question, index) => {
        return {
          ...question,
          userAnswer: userAnswers[index],
          isCorrect:
            userAnswers[index] ===
            question.correctAnswer,
          isAttempted: userAnswers[index] !== "",
        };
      }
    );
    updatedQuestions[index].visited = true;
    updatedQuestions[index].attempted = true;
    setQuestions(updatedQuestions);
    setIsQuizStarted(false);
    setCurrentView("report");
  };

  const handleQuizStart = () => {
    setIsEmailSubmitted(true);
    setIsQuizStarted(true);
  };

  const renderQuizContent = () => {
    if (!isEmailSubmitted) {
      return (
        <StartPage onStart={handleQuizStart} />
      );
    }

    if (isQuizStarted) {
      if (questions.length === 0) {
        return <p>Loading questions...</p>;
      } else if (currentView === "quiz") {
        if (
          currentQuestionIndex < questions.length
        ) {
          return (
            <>
              <Timer
                onTimerEnd={handleTimerEnd}
              />
              <div className="flex justify-between">
                <Question
                  questionData={
                    questions[
                      currentQuestionIndex
                    ]
                  }
                  onNext={handleNext}
                  index={currentQuestionIndex}
                  totalQuestions={
                    questions.length
                  }
                  onSubmit={handleSubmit}
                />
                <OverviewPanel
                  className="py-8"
                  questions={questions}
                  currentQuestionIndex={
                    currentQuestionIndex
                  }
                  onQuestionClick={
                    handleQuestionClick
                  }
                />
              </div>
            </>
          );
        } else {
          setCurrentView("report");
        }
      } else if (currentView === "report") {
        console.log("userAnswers:", userAnswers);
        return (
          <ReportPage
            questions={questions}
            userAnswers={userAnswers}
          />
        );
      }
    }

    return null;
  };

  return (
    <div className="container  mx-auto p-8">
      {renderQuizContent()}
    </div>
  );
};

export default App;
