import axios from "axios";
import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { Pokemon, PokemonData, Type } from "../../context/pokemon.context";

import {
  PokemonsPreviewContainer,
  PokemonsList,
  PokemonsButton,
  PokemonsInputsContainer,
  PokemonSelect,
  PokemonInput,
} from "./pokemons-preview.styles";

import PokemonCard from "../pokemon-card/pokemon-card.component";

const PokemonsPreview = memo(() => {
  const [next, setNext] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0"
  );
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [input, setInput] = useState<string>("");

  const getPokemonData = (
    pokemonURL: string
  ): Promise<PokemonData> | undefined => {
    try {
      return axios(pokemonURL).then((json) => json.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemons = () => {
    try {
      axios(next)
        .then((json) => {
          setNext(json.data.next);
          return json.data.results;
        })
        .then((pokemonList) => {
          const pokemonData = pokemonList.map((pokemon: Pokemon) => {
            return getPokemonData(pokemon.url);
          });

          Promise.all(pokemonData).then((pokemonData: PokemonData[]) => {
            setPokemons([...pokemons, ...pokemonData]);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    axios("https://pokeapi.co/api/v2/type?limit=999").then((json) =>
      setTypes(json.data.results)
    );
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sortedPokemonsByType = useMemo(() => {
    if (selectedType === "all") {
      return pokemons;
    }

    return pokemons.filter((pokemon) => {
      return pokemon.types.some((type) => type.type.name === selectedType);
    });
  }, [pokemons, selectedType]);

  const sortedPokemonsByInputAndType = useMemo(() => {
    if (!input) {
      return sortedPokemonsByType;
    }

    return sortedPokemonsByType.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(input.toLowerCase());
    });
  }, [input, sortedPokemonsByType]);

  return (
    <PokemonsPreviewContainer>
      <PokemonsInputsContainer>
        <PokemonSelect onChange={handleSelectChange}>
          <option value="all">All</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </PokemonSelect>
        <PokemonInput
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search for a Pokemon"
        />
      </PokemonsInputsContainer>
      {sortedPokemonsByInputAndType.length ? (
        <PokemonsList>
          {sortedPokemonsByInputAndType.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </PokemonsList>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Pokemons found</h3>
      )}
      {next && <PokemonsButton onClick={getPokemons}>Load More</PokemonsButton>}
    </PokemonsPreviewContainer>
  );
});

export default PokemonsPreview;
