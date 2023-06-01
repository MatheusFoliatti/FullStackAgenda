import React from "react";

import stylePerson from "./CardPerson.module.css";

import { Stack } from "../Stack/Stack";

export function CardPerson({ cover, avatar, name, office, stacks }) {
  return (
    <div className={stylePerson.card}>
      <img src={cover} alt="Cover" />
      <img className={stylePerson.avatar} src={avatar} alt="Avatar" />
      <p className={stylePerson.p1}>{name}</p>
      <p className={stylePerson.p2}>{office}</p>

      <div className={stylePerson.spans}>
      {stacks.map((stack) => {
						return <Stack key={stack} name={stack.Tec} color={stack.color} />;
					})}
      </div>
      
    </div>
  );
}
