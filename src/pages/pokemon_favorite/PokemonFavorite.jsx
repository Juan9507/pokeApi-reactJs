import React, { useEffect, useState } from "react";

export default function PokemonFavorite() {
  const [pokemonFavorite, setPokemonFavorite] = useState([]);

  let pokemonesFavorites = JSON.parse(localStorage.getItem("copyFavority"));

  useEffect(() => {
    listPokemonId();
  }, []);

  async function listPokemonId() {
    if (pokemonesFavorites != "") {
      await pokemonesFavorites.forEach((value) => {
        try {
          fetch(`https://pokeapi.co/api/v2/pokemon/${value.id}`)
            .then((res) => res.json())
            .then(
              (result) => {
                setPokemonFavorite((pokemonFavorite) => [
                  ...pokemonFavorite,
                  result,
                ]);
                console.log(result);
              },
              (error) => {
                console.log(error);
              }
            );
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  return (
    <>
      {pokemonesFavorites != "" ? (
        pokemonesFavorites.map((pokemon) => {
          return (
            <div>
              <h1>{pokemon.id}</h1>
            </div>
          );
        })
      ) : (
        <h1>No</h1>
      )}
    </>
  );
}
