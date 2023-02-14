import React, { useEffect, useState } from "react"
import textArray from "./constants/defaultText"
import BangumiResults from "./BangumiSearch/BangumiResults"
import InfoPage from "./InfoPage";
import "./App.css"

Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

function App({

}) {
  const [inputText, setInputText] = useState(textArray.random());
  const [results, setResults] = useState({});
  const [activeResult, setActiveResult] = useState(0);
  const [active, setActive] = useState(0);
  const [id, setID] = useState(0);

  useEffect(() => {
    setActive(true);
  }, [activeResult])

  return (
    <div className="main">
      <h1>{inputText}</h1>
      <BangumiResults
        inputText={inputText}
        setActive={setActiveResult}
        id={id}
        setID={setID}
      />
      {(id !== 0) &&
        <InfoPage
          result={activeResult}
          id={id}
          isActive={active}
          setActive={setActive}
        />
      }
    </div>
  )
}
export default App;