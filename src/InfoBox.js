import React, { useEffect, useState } from "react";
import "./InfoBox.css"

function InfoBox({
  id,
  setID,
  setActive,
  infobox,
  characters,
  relations,
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

  function SourceLinkMarkup() {
    let base = "https://bgm.tv/";
    if (id.includes("subjects/")) {
      base += "subject/";
    }
    else if (id.includes("characters/")) {
      base += "character/";
    }

    return infoMarkup(base += id.match(/\/([^\/]+)\/?$/)[1]);
  }

  function characterMarkup() {
    if (characters) {
      return characters.map((character, index) => {
        if (character.actors.length > 0 && (character.relation == "主角" || character.relation == "配角") && index < 16) {
          return <div className="info-fragment character" onClick={() => setSubID("characters/" + character.id)}>
            <img alt={character.name} loading="lazy" async src={character.images.medium.replace(/^http:\/\//i, 'https://')} />
            <div className="relation-info">
              <p className="info-name relation">{character.relation}</p>
              <p className="info-details character">{character.name}</p>
              <p className="info-details actor">{"CV: " + character.actors[0].name}</p>
            </div>
          </div>
        }
      });
    }
  }

  function relationMarkup() {
    if (relations) {
      return relations.map((relation, index) => {
        return <div className="info-fragment character" onClick={() => setSubID("subjects/" + relation.id) && index < 10}>
          {(relation.images) && <img alt={relation.name} loading="lazy" async src={relation.images.medium.replace(/^http:\/\//i, 'https://')} />}
          {(relation.image) && <img alt={relation.name} loading="lazy" async src={relation.image.replace(/^http:\/\//i, 'https://')} />}
          <div className="relation-info">
            <p className="info-name relation">{relation.relation || relation.staff}</p>
            <p className="info-details jp">{relation.name}</p>
            {relation.name_cn && <p className="info-details">{relation.name_cn}</p>}
          </div>
        </div>
      });
    }
  }

  return (
    <div className="infobox">
      <div className="text-info">
        <div className="info-fragment">
          <h4 className="info-name">Source</h4>
          {SourceLinkMarkup()}
        </div>
        {infoBoxMarkup()}
      </div>
      <div className="section characters">
        {characterMarkup()}
      </div>
      <div className="section relations">
        {relationMarkup()}
      </div>
    </div>
  );
}
export default InfoBox;