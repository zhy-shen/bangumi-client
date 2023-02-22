import React from "react"
import InputBox from "./InputBox";
import OptionSelect from "./OptionSelect";
import Button from "./Common/Button"
import svgs from "./Common/svgs"

function AppHeader({
  text,
  setText,
  setInputText,
  setAdvOpen,
  advOpen,
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
  )
}
export default AppHeader;