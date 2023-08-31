import React from "react";

const ReportPage = ({
  questions,
  userAnswers,
}) => {
  const calculateScore = () => {
    const correctAnswers = questions.filter(
      (question, index) => {
        return (
          userAnswers[index] ===
          question.correctAnswer
        );
      }
    ).length;
    return (
      (correctAnswers / questions.length) * 100
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Quiz Report
      </h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{`Question ${
              index + 1
            }:`}</p>
            <p>{question.question}</p>
            <p
              className={`mb-2 ${
                question.isCorrect
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Your Answer:{" "}
              {userAnswers[index]
                ? userAnswers[index]
                : "Unanswered"}
            </p>
            {question.isCorrect ? (
              <p className="text-green-600">
                Correct Answer:{" "}
                {question.correctAnswer}
              </p>
            ) : (
              <p className="text-red-600">
                Correct Answer:{" "}
                {question.correctAnswer}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="text-lg font-semibold mt-4">
        Score: {calculateScore()}% 
      </p>
    </div>
  );
};

export default ReportPage;
