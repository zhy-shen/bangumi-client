import React, { useEffect, useRef, useState } from "react";
import InfoMain from "./InfoMain"
import svgs from "../Common/svgs"
import "./InfoPage.css"

function InfoPage({
  id,
  setID,
  inputText,
  history,
  setHistory,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState(id);
  const [data, setData] = useState("");

  const refID = useRef(localID)
  const active = useRef(isActive)

  useEffect(() => {
    refID.current = id;
  }, [id]);

  useEffect(() => {
    active.current = isActive;
  }, [isActive]);

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

    window.removeEventListener("keydown", (event) => keyboardPop(event));
    window.addEventListener("keydown", (event) => keyboardPop(event));

    function keyboardPop(event) {
      if (event.key === "Escape") {
        handlePopstate();
      }
    }

    function handlePopstate() {
      if (active.current) {
        window.history.pushState({}, '');
      }
      setURL();
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
    if (id && id.split("/").length > 1) {
      return id.split("/")[1];
    }
    return 0;
  }

  function setURL() {
    if (getID(id)) {
      let url = "";
      if ((inputText !== "") || (active.current)) {
        url += "?";
      }
      if (inputText !== "") {
        url += "s=" + inputText.encode();
      }
      if (inputText !== "" && active.current) {
        url += "&";
      }
      if (active.current) {
        url += "id=" + id.encode();
      }

      window.history.replaceState({}, "", url || window.location.href.split("?")[0]);
    }
  }

  useEffect(() => {
    safePush();
    setURL();

    if (isActive && data.name) {
      document.title = data.name.filter();
    }
    else {
      const title = (inputText) ? "Search: " + inputText : "Bangumi Client";
      document.title = title;
    }
  }, [isActive])

  useEffect(() => {
    setURL();
    setLocalID(id);
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
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    getSubject(id);
  }, [id])

  useEffect(() => {
    setReady(data.id == getID(localID));

    if (data.name) {
      document.title = data.name.filter();
    }
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
              <InfoMain
                id={id}
                setID={setID}
                setActive={setActive}
                setActiveResult={setActiveResult}
                data={data}
              />}
          </div>
        </div>
        <div className="interaction-blocker" onClick={(e) => close(e)}></div>
      </div>
    </>
  );
}
export default InfoPage;