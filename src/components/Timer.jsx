import React, {
  useState,
  useEffect,
} from "react";

const Timer = ({ onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] =
    useState(1200); // 20 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(
          (prevTime) => prevTime - 1
        );
      } else {
        clearInterval(timer);
        onTimerEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimerEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div className="flex justify-end mt-4">
      <span className="bg-indigo-500 text-white px-3 py-1 rounded-md">
        Time Remaining:{" "}
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default Timer;
