import React, { useEffect, useState } from "react";
import "./Calendar.css"

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

  function entryMarkup(entries) {
    return entries.map((entry, index) => {
      return <div key={"subjects/" + entry.id} className="info-fragment related" onClick={() => setSubID("subjects/" + entry.id) && index < 10}>
        {(entry.images) && <img alt={entry.name} loading="lazy" async src={entry.images.medium.https()} />}
        {(entry.image) && <img alt={entry.name} loading="lazy" async src={entry.image.https()} />}
        <div className="entry-info">
          <p className="info-name relation jp">{entry.air_date || entry.staff}</p>
          <p className="info-details jp">{entry.name.filter()}</p>
          {entry.name_cn && <p className="info-details">{entry.name_cn}</p>}
        </div>
      </div>
    });
  }

  function returnMarkup() {
    if (Array.isArray(localData)) {
      return (localData.map((weekDay, index) => {
        return (
          <div className="calendar-day">
            <h2 className="weekday">{weekDay.weekday.cn}</h2>
            <div className="entries">
              {entryMarkup(localData[index].items)}
            </div>
          </div>
        )
      }));
    }
    return;
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        {returnMarkup()}
      </div>
    </div>
  );
}
export default Calendar;