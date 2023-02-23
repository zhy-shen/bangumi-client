import React, { useEffect, useState } from "react"
import BangumiResults from "./BangumiSearch/BangumiResults"
import InfoPage from "./InfoPage/InfoPage";
import AppHeader from "./Header/AppHeader";
import ColorControl from "./Common/ColorControl";
import Calendar from "./Calendar/Calendar";

import "./App.css"

function App({

}) {
  let params = (new URL(document.location)).searchParams;

  const [inputText, setInputText] = useState((params.get("s")) ? params.get("s").decode() : "");
  const [text, setText] = useState(inputText);
  const [activeResult, setActiveResult] = useState(0);
  const [active, setActive] = useState(0);
  const [id, setID] = useState(0);

  const [history, setHistory] = useState(["main"]);

  //Search Options
  const [advOpen, setAdvOpen] = useState(false);
  const [category, setCategory] = useState(2);
  const [count, setCount] = useState(5);

  function setURL() {
    let url = "";
    if (inputText !== "") {
      url += "?s=" + inputText.encode();
    }

    window.history.replaceState({}, "", url || window.location.href.split("?")[0]);
  }

  if (!active) {
    const title = (inputText) ? "Search: " + inputText : "Bangumi Client";
    document.title = title;
  }

  useEffect(() => {
    setURL();
  }, [inputText])

  useEffect(() => {
    if (params.get("id")) {
      const passedID = params.get("id").decode();
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
        inputText={inputText}
        setInputText={setInputText}
        advOpen={advOpen}
        setAdvOpen={setAdvOpen}
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
      {(inputText === "") &&
        <Calendar
          setID={setID}
          setActive={setActiveResult}
        />
      }
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