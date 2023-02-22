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
    async function getResults() {
      try {
        const url = "https://api.bgm.tv/search/subject/" + inputText.encode() + "?type=" + category.encode() + "&responseGroup=small&max_results=" + count.encode();

        const response = await fetch(url);
        const data = await response.json();
        setLocalResults(data.list);
      } catch (error) {
        console.log('error: ' + error);
      }
    }

    getResults();
  }, [inputText, category, count])

  return (
    <div className="results-wrapper">
      {getResults()}
    </div>
  );
}
export default BangumiResults;