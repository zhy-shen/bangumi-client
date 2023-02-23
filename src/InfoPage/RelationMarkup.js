import React from "react";

function RelationMarkup({
  relation,
  setSubID
}) {

  return (
    <div className="info-fragment grid related" onClick={() => setSubID("subjects/" + relation.id)}>
      {(relation.images) && <img alt={relation.name} loading="lazy" async src={relation.images.medium.https()} />}
      {(relation.image) && <img alt={relation.name} loading="lazy" async src={relation.image.https()} />}
      <div className="relation-info">
        <p className="info-name relation">{relation.relation || relation.staff}</p>
        <p className="info-details jp">{relation.name.filter()}</p>
        {relation.name_cn && <p className="info-details">{relation.name_cn}</p>}
      </div>
    </div>
  );
}
export default RelationMarkup;