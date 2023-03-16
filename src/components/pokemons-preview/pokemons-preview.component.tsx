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
  PokemonsInputsContainer,
  ButtonSpinner,
} from "./pokemons-preview.styles";

import {
  getPokemons,
  getPokemonsData,
  getTypePokemons,
  getTypes,
} from "../../utils/getPokemons.utils";

import PokemonSelect from "../pokemon-select/pokemon-select.component";
import PokemonInput from "../pokemon-input/pokemon-input.component";
import PokemonsLoadPreview from "../pokemons-load-preview/pokemons-load-preview.component";
import PokemonsTypePreview from "../pokemons-type-preview/pokemons-type-preview.component";

export type GetAllPokemons = (
  request: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => void;

const INITIAL_NEXT_URL = "https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0";

const PokemonsPreview = memo(() => {
  console.log("PokemonsPreview rendered");
  const [next, setNext] = useState<string | null>(INITIAL_NEXT_URL);
  const [previous, setPrevious] = useState<string | null>(null);

  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  console.log(isLoadingPreview);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<string>("all");
  const [input, setInput] = useState<string>("");

  const [offset, setOffset] = useState<number>(0);

  const getAllPokemons: GetAllPokemons = (request, setIsButtonLoading) => {
    try {
      setIsButtonLoading(true);
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
        .finally(() => setIsButtonLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonsByType = (type: string) => {
    if (type === "all") {
      getAllPokemons(INITIAL_NEXT_URL, setIsLoadingPreview); //setIsLoading whole preview component
      return;
    }

    try {
      setIsLoadingPreview(true);
      getTypePokemons(`https://pokeapi.co/api/v2/type/${type}`)
        .then((data) => {
          return data.pokemon.map((pokemonResponse) => pokemonResponse.pokemon);
        })
        .then((pokemonList) => {
          getPokemonsData(pokemonList).then((pokemonData) => {
            setPokemons([...pokemonData]);
          });
        })
        .finally(() => setIsLoadingPreview(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPokemons(next!, setIsLoadingPreview);
  }, []);

  useEffect(() => {
    try {
      getTypes().then((types) => setTypes(types));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPokemonsByType(selectedType);
    setOffset(0);
  }, [types, selectedType]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sortedPokemonsByInput = useMemo(() => {
    if (!input) {
      return pokemons;
    }

    return pokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(input.toLowerCase());
    });
  }, [input, pokemons]);

  return (
    <PokemonsPreviewContainer>
      <PokemonsInputsContainer>
        <PokemonSelect types={types} onChange={handleSelectChange} />
        <PokemonInput value={input} onChange={handleInputChange} />
      </PokemonsInputsContainer>
      {!isLoadingPreview ? (
        selectedType === "all" ? (
          <PokemonsLoadPreview
            next={next}
            previous={previous}
            pokemons={sortedPokemonsByInput}
            getAllPokemons={getAllPokemons}
            isLoadingMore={isLoadingMore}
            isLoadingPrevious={isLoadingPrevious}
            setIsLoadingMore={setIsLoadingMore}
            setIsLoadingPrevious={setIsLoadingPrevious}
          />
        ) : (
          <PokemonsTypePreview
            pokemons={sortedPokemonsByInput}
            offset={offset}
            setOffset={setOffset}
          />
        )
      ) : (
        <ButtonSpinner width="4rem" height="4rem" />
      )}
    </PokemonsPreviewContainer>
  );
});

export default PokemonsPreview;
