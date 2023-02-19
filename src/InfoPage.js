import React, { useEffect, useRef, useState } from "react";
import InfoBox from "./InfoBox"
import svgs from "./Common/svgs"
import "./InfoPage.css"

function InfoPage({
  id,
  setID,
  history,
  setHistory,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState(id);
  const [data, setData] = useState("");
  const [url, setURL] = useState("");

  const refID = useRef(localID)

  useEffect(() => {
    refID.current = id;
  }, [id]);

  const [dataReady, setReady] = useState(false);

  function close() {
    clearHistory();
    setActiveResult(0);
    setActive(false);
  }

  function clearHistory() {
    let string = "nonEmpty";

    while (string !== "main") {
      string = safePopHistory();
    }
  }

  function safePopHistory() {
    if (history.length > 1) {
      return history.pop();
    }
    return "main";
  }

  function popHistory() {
    let pop = safePopHistory();
    if (pop === refID.current) {
      return safePopHistory();
    }
    return pop;
  }

  function safePush() {
    if (history[history.length - 1] !== id && activeResult !== id && isActive) {
      history.push(id);
    }
  }

  useEffect(() => {
    window.removeEventListener("popstate", handlePopstate, true)
    window.addEventListener("popstate", handlePopstate, true)

    function handlePopstate() {
      let pop = popHistory();

      if (pop !== "main") {
        setID(pop);
        setActive(true);
        setActiveResult(pop);
      }
      else {
        close();
      }
    }
  }, []);

  function getID(id) {
    if (id && id.match(/\/([^\/]+)\/?$/).length > 1) {
      return id.match(/\/([^\/]+)\/?$/)[1];
    }
    return 0;
  }

  useEffect(() => {
    safePush();
  }, [isActive])

  useEffect(() => {
    setLocalID(id)
    setReady(false);

    safePush();

    async function getSubject(id) {
      let urls = {};
      try {
        const mainUrl = "https://api.bgm.tv/v0/" + id;
        urls.main = mainUrl;

        if (id.includes("subject")) {
          //get character info
          const characterURL = "https://api.bgm.tv/v0/" + id + "/characters";
          urls.characters = characterURL;
        }

        urls.relation = "https://api.bgm.tv/v0/" + id + "/subjects";

        const requests = Object.values(urls).map((url) => fetch(url));
        const responses = await Promise.all(requests);
        const promises = responses.map(async (response) => await response.json());
        const dataResponse = await Promise.all(promises);

        let data = dataResponse[0];
        if (urls.characters) {
          data.characters = dataResponse[1];
          data.relations = dataResponse[2];
        }
        else {
          data.relations = dataResponse[1];
        }

        setData(data);
        const imageURL = (data.images.large) ? data.images.large : "";
        setURL(imageURL);
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    getSubject(id);
  }, [id])

  useEffect(() => {
    setReady(data.id == getID(localID));
  }, [data])

  return (
    <>
      <div className={"info-popup" + (isActive ? " visible" : "")}>
        <div className="info-wrapper">
          <div className="main-content">
            <div className="close-button" onClick={(e) => close(e)}>{svgs.close}</div>
            {((id !== 0) && !dataReady) ?
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
                <InfoBox id={id} setID={setID} setActive={setActive} setActiveResult={setActiveResult} infobox={data.infobox} characters={data.characters} relations={data.relations} />
              </React.Fragment>}
          </div>
        </div>
        <div className="interaction-blocker" onClick={(e) => close(e)}></div>
      </div>
    </>
  );
}
export default InfoPage;