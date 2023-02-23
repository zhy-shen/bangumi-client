import React from "react";
import CharacterMarkup from "./CharacterMarkup";
import PersonMarkup from "./PersonMarkup";
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
    persons,
    relations
  }
}) {
  const imageURL = (data.images.large) ? data.images.large : "";

  function setSubID(id) {
    setActive(true);
    setID(id);
  }

  function castOrder(relation) {
    const castOrder = ["主角", "配角", "客串"];
    const index = castOrder.indexOf(relation);
    return (index === -1) ? 999 : index;
  }

  function characterMarkup() {
    characters.sort((a, b) => castOrder(a.relation) < castOrder(b.relation) ? -1 : castOrder(a.relation) > castOrder(b.relation) ? 1 : 0)

    return characters.map((character, index) => {
      if (character.actors.length > 0) {
        return <CharacterMarkup key={"character/" + character.id} character={character} setSubID={setSubID} />
      }
    });
  }

  function relationOrder(relation) {
    if (relation === "制作") {
      relation = "製作";
    }

    const castOrder = ["书籍", "片头曲", "片尾曲", "前传", "续集", "番外篇", "衍生", "角色歌", "游戏",
      "原作", "作者", "出版社", "连载杂志", 
      "导演", "动画制作", "音乐制作", 
      "脚本", "系列构成", "人物原案", "人物设定", "总作画监督", "作画监督", "原画"];
    const index = castOrder.indexOf(relation);
    return (index === -1) ? 9999 : index;
  }

  function relationMarkup() {
    relations.sort((a, b) => relationOrder(a.relation || a.staff) < relationOrder(b.relation || b.staff) ? -1 : relationOrder(a.relation || a.staff) > relationOrder(b.relation || b.staff) ? 1 : 0)

    return relations.map((relation) => {
      return <RelationMarkup key={"subjects/" + relation.id + (relation.relation || relation.staff)} relation={relation} setSubID={setSubID} />
    });
  }

  function personOrder(relation) {
    if (relation === "制作") {
      relation = "製作";
    }

    const castOrder = ["原作", "作者", "出版社", "连载杂志", "导演", "动画制作", "音乐制作", "脚本", "人物原案", "人物设定"];
    const index = castOrder.indexOf(relation);
    return (index === -1) ? 9999 : index;
  }

  const filter = ["原作", "作者", "出版社", "连载杂志", "导演", "动画制作", "音乐制作", "脚本", "人物原案", "人物设定"]

  function personMarkup() {
    persons.sort((a, b) => personOrder(a.relation) < personOrder(b.relation) ? -1 : personOrder(a.relation) > personOrder(b.relation) ? 1 : 0)

    return persons.map((person) => {
      if (id.includes("subjects")) {
        if (person.images.medium && filter.includes(person.relation)) {
          return <PersonMarkup key={"persons/" + person.id + person.relation} person={person} setSubID={setSubID} />
        }
      }
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
            <h2 className="jp">Related Works</h2>
            {relationMarkup()}
          </div>
        }
        {(persons && persons.length > 0) &&
          <div className="section persons">
            <h2 className="jp">Related People</h2>
            {personMarkup()}
          </div>
        }
      </div>
    </React.Fragment>
  );
}
export default InfoMain;