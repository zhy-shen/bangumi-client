import React, { useEffect, useState } from "react"
import textArray from "./constants/defaultText"
import BangumiResults from "./BangumiSearch/BangumiResults"
import InfoPage from "./InfoPage/InfoPage";
import InputBox from "./InputBox";
import OptionSelect from "./OptionSelect";
import ColorControl from "./Common/ColorControl";
import "./App.css"

import Button from "./Common/Button"
import svgs from "./Common/svgs"

Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

function App({

}) {
  let params = (new URL(document.location)).searchParams;

  const [inputText, setInputText] = useState(params.get("search") || textArray.random());
  const [text, setText] = useState(inputText);
  const [activeResult, setActiveResult] = useState(0);
  const [active, setActive] = useState(0);
  const [id, setID] = useState(0);

  const [history, setHistory] = useState(["main"]);

  //Search Options
  const [advOpen, setAdvOpen] = useState(false);
  const [category, setCategory] = useState(2);
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (params.get("type") && params.get("id")) {
      const passedID = params.get("type") + "/" + params.get("id");
      history.push(passedID);
      setID(passedID);
      setActive(true);
    }
  }, [])

  useEffect(() => {
    if (activeResult !== 0) {
      if (!active) setActive(true);

      window.history.pushState({}, "");
      window.history.pushState({}, "");
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
        <Button key="expand" text={advOpen} setText={setAdvOpen} char="Toggle" display={svgs.expand} />
        <OptionSelect
          advOpen={advOpen}
          category={category}
          setCategory={setCategory}
          count={count}
          setCount={setCount}
        />
      </div>
      <BangumiResults
        inputText={inputText}
        setActive={setActiveResult}
        id={id}
        setID={setID}
        category={category}
        count={count}
      />
      {(id !== 0) &&
        <InfoPage
          id={id}
          setID={setID}
          history={history}
          setHistory={setHistory}
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