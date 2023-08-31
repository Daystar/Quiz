import React from "react";

const OverviewPanel = ({
  questions,
  currentQuestionIndex,
  onQuestionClick,
}) => {
  return (
    <div className="overview-panel">
      <h2 className="text-lg font-semibold mb-4">
        Overview
      </h2>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(index)}
            className={`py-2 px-4 rounded-lg block w-full text-left ${
              index === currentQuestionIndex
                ? "bg-blue-500 text-white"
                : question.isVisited
                ? question.isAttempted
                  ? "bg-green-500 text-white"
                  : "bg-purple-600"
                : "bg-gray-100"
            }`}
          >
            Question {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OverviewPanel;
