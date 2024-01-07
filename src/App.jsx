import { useState } from "react";
import "./App.scss";
const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [output, setOutput] = useState([]);
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();

  const handleInput = (e, setter) => {
    const value = e.target.value.replace(/\D/, "");
    setter(value);
  };

  const calculateAge = () => {
    setDayError("");
    setMonthError("");
    setYearError("");
    const isInvalidDay = day === "" || day > 31 || day < 1;
    const isInvalidMonth = month === "" || month > 12 || month < 1;
    const isInvalidYear = year === "" || year > currentYear || year < 1;

    if (day === "") {
      setDayError("Field required");
    } else if (isInvalidDay) {
      setDayError("Please enter a valid day");
    } else if (
      ((month === "4" || month === "6" || month === "9" || month === "11") &&
        day > 30) ||
      (month === "2" && day > 29)
    ) {
      setDayError("Must be a valid date");
      setMonthError(" ");
      setYearError(" ");
    }

    if (month === "") {
      setMonthError("Field required");
    } else if (isInvalidMonth) {
      setMonthError("Please enter a valid month");
    }

    if (year === "") {
      setYearError("Field required");
    } else if (isInvalidYear) {
      setYearError("Please enter a valid year");
    }

    if (isInvalidDay || isInvalidMonth || isInvalidYear) {
      return;
    }
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (birthDate > date) {
      setDayError("The date is in the future");
      setMonthError(" ");
      setYearError(" ");
      return;
    }

    const birthYear = +year;
    const birthMonth = +month;
    const birthDay = +day;

    let calculatedYear = currentYear - birthYear;
    let calculatedMonth = currentMonth - birthMonth;
    let calculatedDay = currentDay - birthDay;

    if (calculatedDay < 0) {
      calculatedMonth--;
      calculatedDay = 30 + calculatedDay;
    }

    if (calculatedMonth < 0) {
      calculatedYear--;
      calculatedMonth = 12 + calculatedMonth;
    }
    setOutput([calculatedYear, calculatedMonth, calculatedDay]);
  };

  return (
    <main>
      <div className="card">
        <div className="card__age-input">
          <div className="date">
            <label htmlFor="day">Day</label>
            <input
              type="text"
              name=""
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => handleInput(e, setDay)}
            />
            {dayError && <div className="error">{dayError}</div>}
          </div>
          <div className="date">
            <label htmlFor="month">Month</label>
            <input
              type="text"
              name=""
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => handleInput(e, setMonth)}
            />
            {monthError && <div className="error">{monthError}</div>}
          </div>
          <div className="date">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              name=""
              id="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => handleInput(e, setYear)}
            />
            {yearError && <div className="error">{yearError}</div>}
          </div>
        </div>
        <div className="button">
          <div className="line"></div>
          <button onClick={calculateAge}></button>
        </div>
        <div className="card__age-output">
          <div className="block">
            <span>{output[0] !== undefined ? output[0] : "--"}</span> years
          </div>
          <div className="block">
            <span>{output[1] !== undefined ? output[1] : "--"}</span> months
          </div>
          <div className="block">
            <span>{output[2] !== undefined ? output[2] : "--"}</span> days
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
