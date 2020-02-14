import React from "react";
import "./styles.css";

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map(p => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}
