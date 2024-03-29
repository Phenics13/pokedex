import { FC, MouseEvent, useContext } from "react";

import {
  PokemonContext,
  PokemonData,
  Stats,
} from "../../context/pokemon.context";
import {
  PokemonPreviewCard,
  PokemonPreviewContainer,
  CardTitle,
  CardImage,
} from "./pokemon-preview.styles";

type PokemonPreviewProps = {
  chosePokemon: PokemonData;
};

const PokemonPreview: FC<PokemonPreviewProps> = ({ chosePokemon }) => {
  const { emptyChosePokemon } = useContext(PokemonContext);

  const { id, name, sprites, types, stats, weight, moves } = chosePokemon;

  const actualTypes = types.map((type: any) => type.type.name).join(", ");

  const actualStats = stats.reduce(
    (acc: { [key: string]: number }, stat: Stats) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    },
    {}
  );

  const sortedActualStats = Object.fromEntries(
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

  const handleClose = () => {
    if (document.body.clientWidth <= 480) emptyChosePokemon();
  };

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <PokemonPreviewContainer onClick={handleClose} isOpen={true}>
      <PokemonPreviewCard onClick={handleStopPropagation}>
        <CardImage
          src={sprites.other["official-artwork"].front_default}
          alt={name}
        />
        <CardTitle>
          {chosePokemon.name} {"#" + getNumber(id)}
        </CardTitle>
        <table>
          <tbody>
            <tr>
              <td>Type</td>
              <td>{actualTypes}</td>
            </tr>
            {Object.keys(sortedActualStats).map((stat) => (
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
      </PokemonPreviewCard>
    </PokemonPreviewContainer>
  );
};

export default PokemonPreview;
