import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox"
import svgs from "./Common/svgs"
import "./InfoPage.css"

function InfoPageSub({
  id,
  setID,
  setActiveResult,
  history,
  activeSub,
  setActive,
}) {

  const [localID, setLocalID] = useState("character/00000");
  const [data, setData] = useState("");
  const [url, setURL] = useState("");
  
  const [dataReady, setReady] = useState(false);

  const [visible, setVisible] = useState(activeSub);

  function close(e) {
    history.pop();
    setActiveResult(0);
    setActive(false);
  }

  useEffect(() => {
    setVisible(activeSub);
    history.push("sub-page");
  }, [activeSub])

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
    <div className={"info-popup subpage" + (visible ? " visible" : "")}>
      <div className="info-wrapper">
        <div className="main-content">
          <div className="close-button" onClick={(e) => close(e)}>{svgs.close}</div>
          {(!dataReady) ?
            <h1 className="loading">Loading...</h1>:<React.Fragment key="full">
              <div className="info-header">
                <div className="image sub">
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
              <InfoBox id={id} setID={setID} infobox={data.infobox} characters={data.characters} />
            </React.Fragment>}
        </div>
      </div>
      <div className="interaction-blocker" onClick={(e) => close(e)}></div>
    </div>
  );
}
export default InfoPageSub;