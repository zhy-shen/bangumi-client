import React, { useEffect, useState } from "react"
import textArray from "./constants/defaultText"
import BangumiResults from "./BangumiSearch/BangumiResults"
import InfoPage from "./InfoPage/InfoPage";
import AppHeader from "./AppHeader";
import ColorControl from "./Common/ColorControl";
import Calendar from "./Calendar";

import "./App.css"

function App({

}) {
  let params = (new URL(document.location)).searchParams;

  const [inputText, setInputText] = useState((params.get("s")) ? decodeURI(params.get("s")) : textArray.random());
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
    if (params.get("id")) {
      const passedID = decodeURI(params.get("id"));
      history.push(passedID);
      setID(passedID);
      setActive(true);
    }
  }, [])

  useEffect(() => {
    if (activeResult !== 0) {
      if (!active) setActive(true);
    }
  }, [activeResult])

  return (
    <main>
      <AppHeader
        text={text}
        setText={setText}
        setInputText={setInputText}
        advOpen={advOpen}
        category={category}
        setCategory={setCategory}
        count={count}
        setCount={setCount}
      />
      <BangumiResults
        inputText={inputText}
        setActive={setActiveResult}
        id={id}
        setID={setID}
        category={category}
        count={count}
      />
      <Calendar
        setID={setID}
        setActive={setActiveResult}
      />
      {(id !== 0) &&
        <InfoPage
          id={id}
          setID={setID}
          inputText={inputText}
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