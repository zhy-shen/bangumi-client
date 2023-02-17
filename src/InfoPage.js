import React, { useEffect, useState } from "react";
import svgs from "./Common/svgs"
import "./InfoPage.css"

function InfoPage({
  id,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState("");
  const [data, setData] = useState(activeResult);
  const [url, setURL] = useState("");

  window.addEventListener("popstate", function () {
    window.history.pushState({}, "");
    close();
  }, { once: true })

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      close();
    }
  }, { once: true })

  function close(e) {
    setActiveResult(0);
    setActive(false);
  }

  function returnValues(object) {
    return object.map((entry) => {
      return infoMarkup(Object.values(entry)[0]);
    })
  }

  function infoBoxMarkup() {
    if (data.infobox) {
      return Object.values(data.infobox).map((info) => {
        if (typeof info.value === 'object') {
          return <div className="info-fragment">
            <h4 className="info-name">{info.key}</h4>
            <div className="entry">
              {returnValues(info.value)}
            </div>
          </div>
        }

        return <div className="info-fragment">
          <h4 className="info-name">{info.key}</h4>
          {infoMarkup(info.value)}
        </div>
      });
    }
  }

  //test for links
  function infoMarkup(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    if (urlRegex.test(text)) {
      return <a className="info-details" href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
    }

    return <p className="info-details">{text}</p>;
  }

  useEffect(() => {
    async function getSubject() {
      try {
        const url = "https://api.bgm.tv/v0/subjects/" + encodeURIComponent(id);

        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        const imageURL = (data.images.large) ? data.images.large : "";
        setURL(imageURL);
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    if (id !== localID) {
      setLocalID(id);
      getSubject();
    }
  }, [id])


  return (
    <div className={"info-popup" + (isActive ? " visible" : "")}>
      <div className="info-wrapper">
        <div className="main-content">
          <div className="close-button" onClick={(e) => close(e)}>{svgs.close}</div>
          {(data.id !== id) ?
            <h1 className="loading">Loading...</h1>
            :
            <React.Fragment key="full">
              <div className="info-header">
                <div className="image">
                  <img alt={data.name} async src={url.replace(/^http:\/\//i, 'https://')} />
                </div>
                <div className="info-header-text">
                  <h1 className="jp">{data.name}</h1>
                  <h2>{data.name_cn}</h2>
                  <h2>SubjectID: {data.id}</h2>
                  <p className="summary">{data.summary}</p>
                </div>
              </div>
              <div className="infobox">
                <div className="info-fragment">
                  <h4 className="info-name">Source</h4>
                  {infoMarkup("https://bgm.tv/subject/" + data.id)}
                </div>
                {infoBoxMarkup()}
              </div>
            </React.Fragment>}
        </div>
      </div>
      <div className="interaction-blocker" onClick={(e) => close(e)}></div>
    </div>
  );
}
export default InfoPage;