import React, { useEffect, useState } from "react";
import SingleResult from "./SingleResult";
import "./BangumiResults.css"

function BangumiResults({
  inputText,
  setActive,
  setID
}) {

  const [localResults, setLocalResults] = useState('');

  function getResults() {
    if (Array.isArray(localResults)) {
      return (localResults.map((result) => {
        return <SingleResult key={result.id} result={result} setActive={setActive} setID={setID} />;
      }));
    }
    return;
  }

  useEffect(() => {
    const url = "https://api.bgm.tv/search/subject/" + encodeURIComponent(inputText) + "?type=2&responseGroup=small&max_results=3";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocalResults(data.list);
        console.log(data.list);
      });
  }, [inputText])

  return (
    <div className="results-wrapper">
      {getResults()}
    </div>
  );
}
export default BangumiResults;