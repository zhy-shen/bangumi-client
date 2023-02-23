import React from "react";

function PersonMarkup({
  person,
  setSubID
}) {

  return (
    <div className="info-fragment person" onClick={() => setSubID("persons/" + person.id)}>
      {(person.images) && <img alt={person.name} loading="lazy" async src={person.images.medium.https()} />}
      {(person.image) && <img alt={person.name} loading="lazy" async src={person.image.https()} />}
      <div className="person-info">
        <p className="info-name person">{person.relation || person.staff}</p>
        {person.Name && <p className="info-details jp">{person.Name.filter()}</p>}
        {person.name && <p className="info-details jp">{person.name.filter()}</p>}
        {person.name_cn && <p className="info-details">{person.name_cn}</p>}
      </div>
    </div>
  );
}
export default PersonMarkup;