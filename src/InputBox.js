import React, { useEffect, useState } from "react";
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
    <div className="input-wrapper">
      <input
        label="self-input"
        id="input-box"
        type="search"
        value={text}
        onKeyDown={e => handleText(e)}
        onChange={e => handleText(e)}
        placeholder="Search..."
        spellCheck="false"
      />
    </div>
  );
}
export default InputBox;