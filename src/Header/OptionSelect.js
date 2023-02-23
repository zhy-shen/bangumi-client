import React, { useEffect, useState } from "react";
import "./OptionSelect.css"

function OptionSelect({
  advOpen,
  category,
  setCategory,
  count,
  setCount,
}) {

  function changeSelect(event, set) {
    set(event.target.value);
  }

  return (
    <div className={"advanced-options" + ((advOpen) ? " active" : "")}>
      <div className="advanced-category">
        <span htmlFor="category" className="select-label">Category</span>
        <div className="select-wrapper">
          <select name="category" id="category" aria-label="category" onChange={(e) => changeSelect(e, setCategory)} value={category} >
            <option value="1">Book</option>
            <option value="2">Anime</option>
            <option value="3">Music</option>
            <option value="4">Game</option>
            <option value="6">Real</option>
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
  );
}
export default OptionSelect;