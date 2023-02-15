import React, { useEffect, useState } from "react";
import "./InfoPage.css"

function InfoPage({
  id,
  activeResult,
  setActiveResult,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState('');
  const [data, setData] = useState(activeResult);


  function close(e) {
    setActiveResult(0);
    setActive(false);
  }

  useEffect(() => {
    if (id !== 0) {
      setLocalID(id);
      const url = "https://api.bgm.tv/v0/subjects/" + encodeURIComponent(id);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [id])

  useEffect(() => {
    console.log(data.id);
    console.log(data.infobox);
  }, [data])

  function returnNames(names) {
    console.log(names)
    return names.map((name) => {
      console.log(name)
      return <p className="info-details">{Object.values(name)[0]}</p>
    })
  }

  function infoBoxMarkup() {
    if (data.infobox) {
      return Object.values(data.infobox).map((info) => {
        if (info.key === "别名") {
          return <div className="info-fragment">
            <h4 className="info-name">别名</h4>
            <div className="other-names">
              {returnNames(info.value)}
            </div>
          </div>
        }

        return <div className="info-fragment">
          <h4 className="info-name">{info.key}</h4>
          <p className="info-details">{info.value}</p>
        </div>
      });
    }
  }

  return (
    <div className={"info-popup" + (isActive ? " visible" : "")}>
      <div className="info-wrapper">
        <div className="main-content">
          <div className="close-button" onClick={(e) => close(e)}></div>
          {(data.id == id) &&
            <React.Fragment key="full">
              <div className="info-header">
                <div className="image"><img alt={data.name} async src={data.images.common} /></div>
                <div className="info-header-text">
                  <h2 className="jp">{data.name}</h2>
                  <h3>{data.name_cn}</h3>
                  <h3>{data.id}</h3>
                  <p className="summary">{data.summary}</p>
                </div>
              </div>
              <div className="infobox">
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