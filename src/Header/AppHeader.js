import React from "react"
import InputBox from "./InputBox";
import OptionSelect from "./OptionSelect";
import Button from "../Common/Button"
import svgs from "../Common/svgs"
import textArray from "../Common/defaultText"

function AppHeader({
  text,
  setText,
  inputText,
  setInputText,
  advOpen,
  setAdvOpen,
  category,
  setCategory,
  count,
  setCount,
}) {
  
  return (
    <div className="header">
      <InputBox
        text={text}
        setText={setText}
        inputText={inputText}
        setInputText={setInputText}
      />
      <Button key="expand" text={advOpen} setText={setAdvOpen} char="Toggle" display={svgs.expand} />
      <Button key="refresh" text={textArray} setText={setInputText} char="Refresh" display={svgs.refresh} />
      <OptionSelect
        advOpen={advOpen}
        category={category}
        setCategory={setCategory}
        count={count}
        setCount={setCount}
      />
    </div>
  )
}
export default AppHeader;