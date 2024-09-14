import axios from "axios";

export const getPokemon = (id: number) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.data);
};

export const getPokemonSpecies = (id: number) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.data);
};
