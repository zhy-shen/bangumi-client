import React from "react";

function CharacterMarkup({
  character,
  setSubID
}) {

  return (
    <div className="info-fragment grid character" onClick={() => setSubID("characters/" + character.id)}>
      <img alt={character.name} loading="lazy" async src={character.images.medium.https()} />
      <div className="relation-info">
        <p className="info-name relation">{character.relation}</p>
        <p className="info-details character">{character.name}</p>
        <p className="info-details actor">{"CV: " + character.actors[0].name}</p>
      </div>
    </div>
  );
}
export default CharacterMarkup;