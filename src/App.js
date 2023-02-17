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
  const [activeResult, setActiveResult] = useState(0);
  const [active, setActive] = useState(0);
  const [id, setID] = useState(0);

  //Search Options
  const [advanced, setAdv] = useState(false);
  const [category, setCategory] = useState(2);
  const [count, setCount] = useState(5);

  function changeSelect(event, set) {
    set(event.target.value);
  }

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
        <Button key="expand" text={advanced} setText={setAdv} char="Toggle" display={svgs.expand} />
        <div className={"advanced-options" + ((advanced) ? " active" : "")}>
          <div className="advanced-category">
            <span htmlFor="category" className="select-label">Category</span>
            <div className="select-wrapper">
              <select name="category" id="category" aria-label="category" onChange={(e) => changeSelect(e, setCategory)} value={category} >
                <option value="1">Book</option>
                <option value="2">Anime</option>
                <option value="3">Music</option>
                <option value="4">Game</option>
                <option value="5">Real</option>
              </select>
            </div>
          </div>

          <div className="advanced-count">
            <span htmlFor="count" className="select-label">Count</span>
            <div className="select-wrapper">
              <select name="count" id="count" aria-label="count" onChange={(e) => changeSelect(e, setCount)} value={count} >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>
        </div>
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