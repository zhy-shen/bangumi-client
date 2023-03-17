import React from "react";
import "./InfoMain.css"

function InfoMain({
  id,
  data,
  data: {
    infobox,
  }
}) {

  function returnValues(object) {
    if (id.includes("persons/") && object.key === "别名") {
      return object.value.map((entry) => {
        return infoMarkup(entry.v);
      })
    }
    return object.value.map((entry) => {
      return infoMarkup(Object.values(entry)[0]);
    })
  }

  function infoBoxMarkup() {
    return Object.values(infobox).map((info) => {
      if (typeof info.value === 'object') {
        return <div key={info.key} className="info-fragment">
          <h4 className="info-name">{info.key}</h4>
          <div className="entry">{returnValues(info)}</div>
        </div>
      }

      return <div key={info.key} className="info-fragment">
        <h4 className="info-name">{info.key}</h4>
        {infoMarkup(info.value)}
      </div>
    });
  }

  //test for links
  function infoMarkup(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    if (urlRegex.test(text)) {
      return <a key={text} className="info-details" href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
    }

    return <p key={text} className="info-details">{text}</p>;
  }

  function SourceLinkMarkup() {
    let base = "https://bangumi.tv/";
    if (id.includes("subjects/")) {
      base += "subject/";
    }
    else if (id.includes("characters/")) {
      base += "character/";
    }
    else if (id.includes("persons/")) {
      base += "person/";
    }
    return infoMarkup(base += id.match(/\/([^\/]+)\/?$/)[1]);
  }

  function getScoreText() {
    let text = "";
    if (data.rating) {
      text += data.rating.score.toFixed(1) + " (" + data.rating.total + ")";
      if (data.rating.rank !== 0) {
        text += "  /  Rank: #" + data.rating.rank;
      }
    }
    return text;
  }

  function getScoreTag() {
    if (data.rating) {
      if (data.rating.rank !== 0) {
        return "评分 / 排名";
      }
    }
    return "评分";
  }

  return (
    <>
      <h2 className="jp">信息</h2>
      <div className="info-fragment">
        <h4 className="info-name">Source</h4>
        {SourceLinkMarkup()}
      </div>
      {data.rating &&
        <div className="info-fragment">
          <h4 className="info-name">{getScoreTag()}</h4>
          {data.rating && <p className="info-details">{getScoreText()}</p>}
        </div>}
      {(data.total_episodes && data.total_episodes !== 0) &&
        <div className="info-fragment">
          <h4 className="info-name">总集数</h4>
          {data.total_episodes && <p className="info-details">{data.total_episodes}</p>}
        </div>}
      {infoBoxMarkup()}
    </>
  );
}
export default InfoMain;