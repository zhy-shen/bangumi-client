import React from "react";
import svgs from "../Common/svgs"
import "./InfoMain.css"

function InfoMain({
  id,
  setID,
  setActive,
  data,
  data: {
    infobox,
    characters,
    relations
  }
}) {
  const imageURL = (data.images.large) ? data.images.large : "";

  function returnValues(object) {
    return object.map((entry) => {
      return infoMarkup(Object.values(entry)[0]);
    })
  }

  function infoBoxMarkup() {
    if (infobox) {
      return Object.values(infobox).map((info) => {
        if (typeof info.value === 'object') {
          return <div key={info.key} className="info-fragment">
            <h4 className="info-name">{info.key}</h4>
            <div className="entry">{returnValues(info.value)}</div>
          </div>
        }

        return <div key={info.key} className="info-fragment">
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
      return <a key={text} className="info-details" href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
    }

    return <p key={text} className="info-details">{text}</p>;
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
    return characters.map((character, index) => {
      if (character.actors.length > 0 && (character.relation == "主角" || character.relation == "配角") && index < 26) {
        return <div key={"characters/" + character.id} className="info-fragment character" onClick={() => setSubID("characters/" + character.id)}>
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

  function relationMarkup() {
    return relations.map((relation, index) => {
      return <div key={"subjects/" + relation.id} className="info-fragment related" onClick={() => setSubID("subjects/" + relation.id) && index < 10}>
        {(relation.images) && <img alt={relation.name} loading="lazy" async src={relation.images.medium.replace(/^http:\/\//i, 'https://')} />}
        {(relation.image) && <img alt={relation.name} loading="lazy" async src={relation.image.replace(/^http:\/\//i, 'https://')} />}
        <div className="relation-info">
          <p className="info-name relation">{relation.relation || relation.staff}</p>
          <p className="info-details jp">{relation.name.replace(/&amp;/g, "&")}</p>
          {relation.name_cn && <p className="info-details">{relation.name_cn}</p>}
        </div>
      </div>
    });
  }

  return (
    <React.Fragment key="info-header">
      <div className="info-header">
        <div className="image">
          <img alt={data.name} async loading="lazy" src={imageURL.replace(/^http:\/\//i, 'https://')} />
          {svgs.noImage}
        </div>
        <div className="info-header-text infobox">
          <div>
            <h1 className="jp">{data.name.replace(/&amp;/g, "&")}</h1>
            <h2>{data.name_cn}</h2>
            <h2>SubjectID: {data.id}</h2>
            <p className="summary">{data.summary}</p>
          </div>
          <div className="text-info">
            <h2 className="jp">Info</h2>
            <div className="info-fragment">
              <h4 className="info-name">Source</h4>
              {SourceLinkMarkup()}
            </div>
            {infoBoxMarkup()}
          </div>
        </div>
      </div>
      <div className="infobox">
        {(characters && characters.length > 0) &&
          <div className="section characters">
            <h2 className="jp">Characters</h2>
            {characterMarkup()}
          </div>
        }
        {(relations && relations.length > 0) &&
          <div className="section relations">
            <h2 className="jp">Related</h2>
            {relationMarkup()}
          </div>
        }
      </div>
    </React.Fragment>
  );
}
export default InfoMain;