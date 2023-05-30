import React from "react";

import stylePerson from "./CardPerson.module.css";

export function CardPerson({ cover, avatar, name, office }) {
  return (
    <div className={stylePerson.card}>
      <img src={cover} alt="Cover" />
      <img className={stylePerson.avatar} src={avatar} alt="Avatar" />
      <p className={stylePerson.p1}>{name}</p>
      <p className={stylePerson.p2}>{office}</p>

      <div className={stylePerson.spans}>
      <span >#CSS</span>
      <span >#HTML</span>
      <span >#REACT</span>
      <span >#NATIVE</span>
      </div>
      
    </div>
  );
}
