import React, {
  useState,
  useEffect,
} from "react";

const Question = ({
  questionData,
  onNext,
  index,
  totalQuestions,
  onSubmit,
}) => {
  const [selectedChoice, setSelectedChoice] =
    useState("");
  const [hasVisited, setHasVisited] =
    useState(false); // Track whether the question has been visited

  useEffect(() => {
    setSelectedChoice(
      questionData.userAnswer || ""
    );
    setHasVisited(!!questionData.userAnswer); // Mark question as visited if it has an answer
  }, [questionData]);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const handleNextClick = () => {
    onNext(selectedChoice);
    setSelectedChoice("");
    setHasVisited(true); // Mark question as visited when moving to the next question
  };

  const handleUnansweredSubmit = () => {
    onSubmit(selectedChoice);
    setSelectedChoice("");
    setHasVisited(true); // Mark question as visited when submitting unanswered
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">{`Question ${
        index + 1
      }/${totalQuestions}`}</h2>
      <p className="mb-4">
        {questionData.question}
      </p>
      <div className="space-y-2">
        {questionData.choices.map(
          (choice, choiceIndex) => (
            <button
              key={choiceIndex}
              onClick={() =>
                handleChoiceSelect(choice)
              }
              className={`py-2 px-4 rounded-lg block w-full text-left ${
                selectedChoice === choice
                  ? "bg-blue-500 text-white"
                  : hasVisited
                  ? "bg-gray-300"
                  : ""
              }`}
            >
              {choice}
            </button>
          )
        )}
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleNextClick}
          className={`py-2 px-4 rounded bg-blue-500 text-white`}
        >
          Next
        </button>
        {index === totalQuestions - 1 && (
          <button
            onClick={handleUnansweredSubmit}
            className={`py-2 px-4 rounded bg-blue-500 text-white`}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
