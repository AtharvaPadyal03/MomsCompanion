import { useState, useEffect } from "react";
import axios from "axios";
import loadingImg from "../assets/loading.png";
const Countdown = () => {
  const [targetDate,setTargetDate] = useState('')
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/getExpectedDate", {
        withCredentials: true,
      })
      .then((res) => {
        setTargetDate(res.data.data.split("T")[0]);
      })
      .catch((err) => {
        console.error("Error fetching Expected date:", err);
      });
  }, []);
  

  const formatDate = (dateString) => {
    const rawDate = dateString.split(" ")[0]; // gets "09-04-2025"
    const [day, month, year] = rawDate.split("-");
    return `${year}-${month}-${day}`; // converts to "2025-04-09"
  };
  
  

  const calculateTimeLeft = () => {
    if (!targetDate) return { months: 0, days: 0 };

    const now = new Date();
    const formattedDate = formatDate(targetDate);
    const dueDate = new Date(formattedDate);
    
    const diff = dueDate - now;
    

    if (diff <= 0) return { months: 0, days: 0 };

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysLeft / 30);
    const days = daysLeft % 30;

    return { months, days };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  },[targetDate]);

  return (
    <div className="p-4 bg-colors-customGreen2 shadow-lg text-center">
      {(timeLeft.months === 0 && timeLeft.days === 0) ? (
        <div className="flex justify-center items-center">
          <img src={loadingImg} alt="Loading..." className="w-12 h-12 animate-spin" />
        </div>
      ) : (
        <p className="text-lg text-colors-customGreen1">
          {timeLeft.months} months and {timeLeft.days} days remaining to hold your little miracle in your arms! 💖
        </p>
      )}
    </div>
  );
};

export default Countdown;
