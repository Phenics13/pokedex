import { FC, useContext, useEffect } from "react";

import { PokemonContext, PokemonData } from "../../context/pokemon.context";
import {
  PokemonPreviewCard,
  PokemonPreviewContainer,
  CardTitle,
  CardImage,
} from "./pokemon-preview.styles";

type PokemonPreviewInnerProps = {
  chosePokemon: PokemonData;
};

const PokemonPreviewInner: FC<PokemonPreviewInnerProps> = ({
  chosePokemon,
}) => {
  const { id, name, imageURL, types, stats, weight, moves } = chosePokemon;

  const actualTypes = types.map((type: any) => type.type.name).join(", ");

  const actualStats = stats.reduce((acc: any, stat: any) => {
    acc[stat.stat.name] = stat.base_stat;
    return acc;
  }, {});

  const sortedActualStats: any = Object.fromEntries(
    Object.entries(actualStats)
      .sort()
      .map((entry) => {
        const [stat, value] = entry;
        const newStat = stat.replace("special-", "SP ");
        return [newStat, value];
      })
  );

  const getNumber = (pokemonId: number): string => {
    if (pokemonId < 10) return `00${pokemonId}`;
    if (pokemonId < 100) return `0${pokemonId}`;
    return pokemonId.toString();
  };

  return (
    <>
      <CardImage src={imageURL} alt={name} />
      <CardTitle>
        {chosePokemon.name} {"#" + getNumber(id)}
      </CardTitle>
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{actualTypes}</td>
          </tr>
          {Object.keys(sortedActualStats).map((stat: any) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td>{sortedActualStats[stat]}</td>
            </tr>
          ))}
          <tr>
            <td>Weight</td>
            <td>{weight}</td>
          </tr>
          <tr>
            <td>Total moves</td>
            <td>{moves.length}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const PokemonPreview = () => {
  const { chosePokemon } = useContext(PokemonContext);
  console.log(chosePokemon);

  return (
    <PokemonPreviewContainer>
      <PokemonPreviewCard>
        {!chosePokemon ? (
          <h3>Choose a Pokemon</h3>
        ) : (
          <PokemonPreviewInner chosePokemon={chosePokemon} />
        )}
      </PokemonPreviewCard>
    </PokemonPreviewContainer>
  );
};

export default PokemonPreview;
