import React, { useEffect, useState } from "react";
import "./InfoBox.css"

function InfoBox({
  id,
  setID,
  setActive,
  infobox,
  characters,
}) {

  function returnValues(object) {
    return object.map((entry) => {
      return infoMarkup(Object.values(entry)[0]);
    })
  }

  function infoBoxMarkup() {
    if (infobox) {
      return Object.values(infobox).map((info) => {
        if (typeof info.value === 'object') {
          return <div className="info-fragment">
            <h4 className="info-name">{info.key}</h4>
            <div className="entry">{returnValues(info.value)}</div>
          </div>
        }

        return <div className="info-fragment">
          <h4 className="info-name">{info.key}</h4>
          {infoMarkup(info.value)}
        </div>
      });
    }
  }

  function setSubID(id) {
    setActive(true);
    setID(id);
  }

  //test for links
  function infoMarkup(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    if (urlRegex.test(text)) {
      return <a className="info-details" href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
    }

    return <p className="info-details">{text}</p>;
  }

  function characterMarkup() {
    if (characters) {
      return characters.map((character, index) => {
        if (character.actors.length > 0 && (character.relation == "主角" || character.relation == "配角") && index < 10) {
          return <div className="info-fragment character" onClick={() => setSubID("characters/" + character.id)}>
          <img alt={character.name} loading="lazy" async src={character.images.medium.replace(/^http:\/\//i, 'https://')} />
          <p className="info-name relation">{character.relation}</p>
            <p className="info-details character">{character.name}</p>
            <p className="info-details actor">{"CV: " + character.actors[0].name}</p>
          </div>
        }
      });  
    }
  }

  return (
    <div className="infobox">
      {characterMarkup()}
      <div className="info-fragment">
        <h4 className="info-name">Source</h4>
        {infoMarkup("https://bgm.tv/" + id)}
      </div>
      {infoBoxMarkup()}
    </div>
  );
}
export default InfoBox;