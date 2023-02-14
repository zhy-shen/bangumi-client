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
          console.log(data);
          setData(data);
        });
    }
  }, [id])

  useEffect(() => {
    console.log(data.id);
    console.log(id);
  }, [data])

  return (
    <div className={"info-popup" + (isActive ? " visible" : "")}>
      <div className="info-wrapper">
        <div className="close-button" onClick={(e) => close(e)}></div>
        {(data.id !== id) ?
          <h1>Loading...</h1>
          :
          <React.Fragment key="full">
            <div className="info-header">
            <div class="image"><img alt={data.name} async src={data.images.common} /></div>
              <div className="info-header-text">
                <h2 className="jp">{data.name}</h2>
                <h3>{data.name_cn}</h3>
                <h3>{data.id}</h3>
              </div>
            </div>
            <p className="summary">{data.summary}</p>
          </React.Fragment>
        }
      </div>
      <div class="interaction-blocker" onClick={(e) => close(e)}></div>
    </div>
  );
}
export default InfoPage;