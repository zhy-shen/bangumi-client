import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox"
import InfoPageSub from "./InfoPageSub"
import svgs from "./Common/svgs"
import "./InfoPage.css"

function InfoPage({
  id,
  setID,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState("");
  const [data, setData] = useState("");
  const [url, setURL] = useState("");

  const [subID, setSubID] = useState(0);
  const [activeSub, setActiveSub] = useState(false);
  const [activeSubID, setActiveSubID] = useState(false);

  function close(e) {
    setActiveResult(0);
    setActive(false);
  }

  useEffect(() => {
    if (activeSubID !== 0) {
      setActiveSub(true);
    }
  }, [activeSub])

  useEffect(() => {
    window.addEventListener("popstate", handleState)

    function handleState(event) {
      console.log("state-info");
      if (event.state.page === "main-page") {
        close();
        window.removeEventListener("popstate", handleState);
      }
    }
  
    // window.addEventListener("keydown", function key(event) {
    //   if (event.key === "Escape") {
    //     history.back();
    //     close();
    //   }
    // });

    window.history.pushState({ page: "main-page" }, "");
  }, [])

  useEffect(() => {
    document.querySelector(".main-content").scrollTop = 0;

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
      setLocalID(id);
      getSubject();
    }
  }, [id])

  return (
    <>
      <div className={"info-popup" + (isActive ? " visible" : "")}>
        <div className="info-wrapper">
          <div className="main-content">
            <div className="close-button" onClick={(e) => close(e)}>{svgs.close}</div>
            {(data.id === id.match(/\/([^\/]+)\/?$/)[1]) ?
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
                <InfoBox id={data.id} setID={setSubID} setActive={setActiveSub} infobox={data.infobox} characters={data.characters} />
              </React.Fragment>}
          </div>
        </div>
        <div className="interaction-blocker" onClick={(e) => close(e)}></div>
      </div>
      {(subID !== 0) &&
        <InfoPageSub
          id={subID}
          setID={setSubID}
          isActive={activeSub}
          setActive={setActiveSub}
        />
      }
    </>
  );
}
export default InfoPage;