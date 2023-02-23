import React, { useEffect, useState } from "react";
import CalendarMarkup from "./CalendarMarkup";
import "./Calendar.css";

function Calendar({
  setID,
  setActive
}) {

  const [localData, setlocalData] = useState('');

  function setSubID(id) {
    setActive(true);
    setID(id);
  }

  useEffect(() => {
    async function getResults() {
      try {
        const url = "https://api.bgm.tv/calendar";
        const response = await fetch(url);
        const data = await response.json();
        setlocalData(data);
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    getResults();
  }, [])

  return (
    <div className="calendar-wrapper">
      <h1>每日放送</h1>
      <div className="calendar">
        <CalendarMarkup localData={localData} setSubID={setSubID} />
      </div>
    </div>
  );
}
export default Calendar;