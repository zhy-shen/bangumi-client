import React, { useEffect, useState } from "react"
import textArray from "./constants/defaultText"
import BangumiResults from "./BangumiSearch/BangumiResults"
import InfoPage from "./InfoPage";
import InputBox from "./InputBox";
import ColorControl from "./Common/ColorControl";
import "./App.css"

import Button from "./Common/Button"
import svgs from "./Common/svgs"

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

  useEffect(() => {
    if (activeResult !== 0) {
      setActive(true);
    }
  }, [activeResult])

  return (
    <main>
      <div className="header">
        <InputBox
          text={text}
          setText={setText}
          setInputText={setInputText}
        />
        <Button key="expand" text={""} setText={""} char="Expand" display={svgs.expand} />
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
      <ColorControl />
    </main>
  )
}
export default App;