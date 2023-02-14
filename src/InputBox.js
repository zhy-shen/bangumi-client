import React, { useEffect, useState } from "react";
import Button from "./Common/Button"
import svgs from "./Common/svgs"
import "./InputBox.css"

function InputBox({
  text,
  setText,
  setInputText
}) {

  useEffect(() => {
  }, [])

  function handleText(e) {
    if (e.key === "Enter") {
      setInputText(text);
    };
    setText(e.target.value);
  }

  return (
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
      <Button key="expand" text={""} setText={""} char="Expand" display={svgs.expand} />
    </div>
  );
}
export default InputBox;