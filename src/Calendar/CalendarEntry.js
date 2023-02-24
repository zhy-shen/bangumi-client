import React from "react";

function CalendarEntry({
  entry,
  setSubID
}) {

  return (
    <div className="info-fragment grid related" onClick={() => setSubID("subjects/" + entry.id)}>
      {(entry.images) && <img alt={entry.name} loading="lazy" async src={entry.images.medium.https()} />}
      {(entry.image) && <img alt={entry.name} loading="lazy" async src={entry.image.https()} />}
      <div className="entry-info">
        <p className="info-name relation jp">{entry.air_date || entry.staff}</p>
        <p className="info-details jp">{entry.name.filter()}</p>
        {entry.name_cn && <p className="info-details">{entry.name_cn}</p>}
        {entry.rating && <p className="info-details">{entry.rating.score.toFixed(1) + "/10" + "   ( " + entry.rating.total + " )"}</p>}
        {entry.rank && <p className="info-details">{"#" + entry.rank}</p>}
      </div>
    </div>
  );
}
export default CalendarEntry;