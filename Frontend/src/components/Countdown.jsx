import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const dueDate = new Date(targetDate);
    const diff = dueDate - now;

    if (diff <= 0) return { months: 0, days: 0 };

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysLeft / 30); // Approximate months
    const days = daysLeft % 30;

    return { months, days };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-colors-customGreen2  shadow-lg text-center">
    
      <p className="text-lg text-colors-customGreen1">
        {timeLeft.months} months and {timeLeft.days} days remaining to hold your little miracle in your arms! 💖
      </p>
    </div>
  );
};

export default Countdown;
