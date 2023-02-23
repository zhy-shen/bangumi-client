import React from "react";
import CalendarEntry from "./CalendarEntry";

function CalendarMarkup({
  localData,
  setSubID
}) {

  function entryMarkup(entries) {
    return entries.map((entry) => {
      return <CalendarEntry key={"subjects/" + entry.id} entry={entry} setSubID={setSubID} />
    });
  }

  function returnMarkup() {
    if (Array.isArray(localData)) {
      return localData.map((weekDay, index) => {
        return (
          <div key={weekDay.weekday.cn} className="calendar-day">
            <h2 className="weekday">{weekDay.weekday.cn}</h2>
            <div className="entries">
              {entryMarkup(localData[index].items)}
            </div>
          </div>
        )
      });
    }
    return;
  }

  return (
    <>
      {returnMarkup()}
    </>
  );
}
export default CalendarMarkup;