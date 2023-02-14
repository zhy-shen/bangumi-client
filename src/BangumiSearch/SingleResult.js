import React, { useEffect, useState } from "react";
import "./SingleResult.css"

function SingleResult({
  result,
  setActive,
  setID,
}) {

  useEffect(() => {
  }, [])

  function openResult() {
    setActive(result);
    setID(result.id)
  }

  return (
    <div className="bangumi-result" onClick={() => openResult()}>
      <img async src={result.images.common} />
      <h2 className="jp">{result.name}</h2>
      <h3>{result.name_cn}</h3>
      <h3>{result.id}</h3>
    </div>
  );
}
export default SingleResult;