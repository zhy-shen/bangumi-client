import React, { useEffect, useState } from "react";
import SingleResult from "./SingleResult";
import "./BangumiResults.css"

function BangumiResults({
  inputText,
  setActive,
  setID,
  category,
  count,
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
    const url = "https://api.bgm.tv/search/subject/" + encodeURIComponent(inputText) + "?type=" + encodeURIComponent(category) + "&responseGroup=small&max_results=" + encodeURIComponent(count);
    console.log(url)

    fetch(url)
      .then((response) => (response) ? response.json() : new Error(response.status))
      .then((data) => {
        setLocalResults(data.list);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  }, [inputText, category, count])

  return (
    <div className="results-wrapper">
      {getResults()}
    </div>
  );
}
export default BangumiResults;