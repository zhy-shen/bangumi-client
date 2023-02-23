import React from "react";
import CharacterMarkup from "./CharacterMarkup";
import RelationMarkup from "./RelationMarkup";
import InfoBoxText from "./InfoBoxText";
import svgs from "../Common/svgs";
import "./InfoMain.css";
import "./InfoFragment.css";

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

  function setSubID(id) {
    setActive(true);
    setID(id);
  }

  function castOrder(relation) {
    switch(relation) {
      case "主角":
      return 5;
      case "配角":
      return 4;
      case "客串":
      return 3;
    }

    return 1;
  }

  function characterMarkup() {
    console.log(characters)
    characters.sort((a, b) => castOrder(a.relation) > castOrder(b.relation) ? -1 : castOrder(a.relation) < castOrder(b.relation) ? 1 : 0)
    console.log(characters)

    return characters.map((character, index) => {
      if (character.actors.length > 0) {
        return <CharacterMarkup key={"character/" + character.id} character={character} setSubID={setSubID} />
      }
    });
  }

  function relationMarkup() {
    return relations.map((relation, index) => {
      return <RelationMarkup key={"subjects/" + relation.id} relation={relation} setSubID={setSubID} />
    });
  }

  return (
    <React.Fragment key="info-header">
      <div className="info-header">
        <div className="image">
          <img alt={data.name} async loading="lazy" src={imageURL.https()} />
          {svgs.noImage}
        </div>
        <div className="info-header-text infobox">
          <div>
            <h1 className="jp">{data.name.filter()}</h1>
            <h2>{data.name_cn}</h2>
            <h2>SubjectID: {data.id}</h2>
            <p className="summary">{data.summary}</p>
          </div>
          <div className="text-info">
            {infobox && <InfoBoxText id={id} data={data} />}
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