import React, { useEffect, useState } from "react";
import svgs from "../Common/svgs";
import "./SingleResult.css"

function SingleResult({
  result,
  setActive,
  setID,
}) {

  const imageURL = (result.images) ? result.images.common : "";

  function openResult() {
    setActive(result);
    setID("subjects/" + result.id)
  }

  return (
    <div className="bangumi-result" onClick={() => openResult()}>
      <div className="image">
        <img alt={result.name} async loading="lazy" src={imageURL.https()} />
        {svgs.noImage}
      </div>
      <div className="result-info">
        <h2 className="jp">{result.name.filter()}</h2>
        <h3>{result.name_cn}</h3>
        <h3>{result.id}</h3>
      </div>
    </div>
  );
}
export default SingleResult;