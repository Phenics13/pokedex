import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import { PokemonData, Type } from "../../context/pokemon.context";

import {
  PokemonsPreviewContainer,
  PokemonsList,
  PokemonsButton,
  PokemonsInputsContainer,
  ButtonSpinner,
} from "./pokemons-preview.styles";

import {
  getPokemons,
  getPokemonsData,
  getTypes,
} from "../../utils/getPokemons.utils";

import PokemonCard from "../pokemon-card/pokemon-card.component";
import PokemonSelect from "../pokemon-select/pokemon-select.component";
import PokemonInput from "../pokemon-input/pokemon-input.component";

const PokemonsPreview = memo(() => {
  const [next, setNext] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0"
  );
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<Type[]>([]);

  const [selectedType, setSelectedType] = useState<string>("all");
  const [input, setInput] = useState<string>("");

  const getAllPokemons = () => {
    try {
      setIsLoading(true);
      getPokemons(next)
        .then((data) => {
          setNext(data.next);
          return data.results;
        })
        .then((pokemonList) => {
          getPokemonsData(pokemonList).then((pokemonData) => {
            setPokemons([...pokemons, ...pokemonData]);
          });
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    try {
      getTypes().then((types) => setTypes(types));
    } catch (error) {
      console.log(error);
    }
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
        <PokemonSelect types={types} onChange={handleSelectChange} />
        <PokemonInput value={input} onChange={handleInputChange} />
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
      {next && (
        <PokemonsButton onClick={getAllPokemons}>
          {isLoading ? <ButtonSpinner /> : "Load More"}
        </PokemonsButton>
      )}
    </PokemonsPreviewContainer>
  );
});

export default PokemonsPreview;
