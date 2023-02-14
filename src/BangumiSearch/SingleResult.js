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
      <div class="image"><img alt={result.name} async src={result.images.common} /></div>
      <h2 className="jp">{result.name}</h2>
      <h3>{result.name_cn}</h3>
      <h3>{result.id}</h3>
    </div>
  );
}
export default SingleResult;