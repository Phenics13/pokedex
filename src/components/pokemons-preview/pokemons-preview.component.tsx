import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PokemonData, Type } from "../../context/pokemon.context";

import {
  PokemonsPreviewContainer,
  PokemonsList,
  LoadMoreButton,
  LoadPreviousButton,
  PokemonsInputsContainer,
  ButtonSpinner,
  ButtonsContainer,
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
  const [previous, setPrevious] = useState<string | null>(null);

  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<string>("all");
  const [input, setInput] = useState<string>("");

  const getAllPokemons = (
    request: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setIsLoading(true);
      getPokemons(request)
        .then((data) => {
          setNext(data.next);
          setPrevious(data.previous);
          return data.results;
        })
        .then((pokemonList) => {
          getPokemonsData(pokemonList).then((pokemonData) => {
            setPokemons([...pokemonData]);
          });
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPokemons(next, setIsLoadingMore);
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
      <ButtonsContainer>
        {previous && (
          <LoadPreviousButton
            onClick={() => getAllPokemons(previous, setIsLoadingPrevious)}
            disabled={isLoadingPrevious}
          >
            {isLoadingPrevious ? <ButtonSpinner /> : "Load Previous"}
          </LoadPreviousButton>
        )}
        {next && (
          <LoadMoreButton
            onClick={() => getAllPokemons(next, setIsLoadingMore)}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? <ButtonSpinner /> : "Load More"}
          </LoadMoreButton>
        )}
      </ButtonsContainer>
    </PokemonsPreviewContainer>
  );
});

export default PokemonsPreview;
