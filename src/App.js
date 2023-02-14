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
  const [text, setText] = useState(inputText);
  const [results, setResults] = useState({});
  const [activeResult, setActiveResult] = useState(0);
  const [active, setActive] = useState(0);
  const [id, setID] = useState(0);

  function handleText(e) {
    console.log(e)
    if (e.key === "Enter") {
      setInputText(text);
      console.log(e.target.value)
    };
    setText(e.target.value);
  }

  useEffect(() => {
    if (activeResult !== 0) {
      setActive(true);
    }
  }, [activeResult])

  return (
    <div className="main">
      <div className="input-box">
        <div className="input-wrapper">
          <input
            label="self-input"
            id="input-box"
            value={text}
            onKeyDown={e => handleText(e)}
            onChange={e => handleText(e)}
            placeholder="Search..."
            spellCheck="false"
          />
        </div>
      </div>
      <h1 className="search-string jp">{inputText}</h1>
      <BangumiResults
        inputText={inputText}
        setActive={setActiveResult}
        id={id}
        setID={setID}
      />
      {(id !== 0) &&
        <InfoPage
          id={id}
          activeResult={activeResult}
          setActiveResult={setActiveResult}
          isActive={active}
          setActive={setActive}
        />
      }
    </div>
  )
}
export default App;