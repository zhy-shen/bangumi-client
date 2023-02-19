import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox"
import InfoPageSub from "./InfoPageSub"
import svgs from "./Common/svgs"
import "./InfoPage.css"

function InfoPage({
  id,
  setID,
  history,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState("");
  const [data, setData] = useState("");
  const [url, setURL] = useState("");
  
  const [dataReady, setReady] = useState(false);

  const [subID, setSubID] = useState(0);
  const [activeSubID, setActiveSubID] = useState(0);
  const [activeSub, setActiveSub] = useState(false);

  function close(e) {
    setActiveResult(0);
    setActive(false);
  }

  function closeSub(e) {
    setActiveSubID(0);
    setActiveSub(false);

    console.log(history);
    if (history[history.length - 1] !== "info-page") {
      history.push("info-page");
    }
  }

  useEffect(() => {
    if (subID !== 0) {
      setActiveSub(true);
      
      window.history.pushState({}, "");
      window.history.pushState({}, "");
    }
  }, [subID])

  useEffect(() => {
    if (history[history.length - 1] !== "info-page") {
      history.push("info-page");
    }

    window.addEventListener("popstate", () => {
      const pop = history.pop();
      console.log(history);
      if (pop === "sub-page") {
        closeSub();
      }
      else if (pop === "info-page") {
        close();
      }
    })
  }, []);

  useEffect(() => {
    setReady(false);

    async function getSubject() {
      try {
        const url = "https://api.bgm.tv/v0/" + id;
        const response = await fetch(url);
        const data = await response.json();

        if (id.includes("subject")) {
          //get character info
          const characterURL = "https://api.bgm.tv/v0/" + id + "/characters";
          const character = await fetch(characterURL);
          const characterData = await character.json();
          data.characters = characterData;
        }

        setData(data);
        const imageURL = (data.images.large) ? data.images.large : "";
        setURL(imageURL);
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    if (id !== localID) {
      setLocalID(id.match(/\/([^\/]+)\/?$/)[1]);
      getSubject();
    }
  }, [id])

  useEffect(() => {
    setReady(data.id == localID);
  }, [data])

  return (
    <>
      <div className={"info-popup" + (isActive ? " visible" : "")}>
        <div className="info-wrapper">
          <div className="main-content">
            <div className="close-button" onClick={(e) => close(e)}>{svgs.close}</div>
            {(!dataReady) ?
              <h1 className="loading">Loading...</h1>
              :
              <React.Fragment key="full">
                <div className="info-header">
                  <div className="image">
                    <img alt={data.name} async src={url.replace(/^http:\/\//i, 'https://')} />
                    {svgs.noImage}
                  </div>
                  <div className="info-header-text">
                    <h1 className="jp">{data.name}</h1>
                    <h2>{data.name_cn}</h2>
                    <h2>SubjectID: {data.id}</h2>
                    <p className="summary">{data.summary}</p>
                  </div>
                </div>
                <InfoBox id={id} setID={setSubID} setActive={setActiveSub} infobox={data.infobox} characters={data.characters} />
              </React.Fragment>}
          </div>
        </div>
        <div className="interaction-blocker" onClick={(e) => close(e)}></div>
      </div>
      {(subID !== 0) &&
        <InfoPageSub
          id={subID}
          setID={setSubID}
          setActiveResult={setActiveSubID}
          history={history}
          activeSub={activeSub}
          setActive={setActiveSub}
        />
      }
    </>
  );
}
export default InfoPage;