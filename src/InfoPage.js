import React, { useEffect, useState } from "react";
import "./InfoPage.css"

function InfoPage({
  result,
  id,
  isActive,
  setActive,
}) {

  const [localID, setLocalID] = useState('');
  const [data, setData] = useState(result);


  function close(e) {
    setActive(false);
  }

  useEffect(() => {
    setLocalID(id);
    const url = "https://api.bgm.tv/v0/subjects/" + encodeURIComponent(id);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
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
              <img async src={result.images.common} />
              <h2 className="jp">
                {data.name}
              </h2>
              <h3>
                {data.name_cn}
              </h3>
            </div>
            <p className="summary">
              {data.summary}
            </p>
            <h3>
              {data.id}
            </h3>
          </React.Fragment>
        }
      </div>
    </div>
  );
}
export default InfoPage;