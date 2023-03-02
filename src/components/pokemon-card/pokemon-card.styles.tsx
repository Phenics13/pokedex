import styled from "styled-components";

export const PokemonCardContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 10rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0px 3.1px 10px rgba(0, 0, 0, 0.035),
    0px 25px 80px rgba(0, 0, 0, 0.07);
  cursor: pointer;

  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: none;
  }
`;

export const PokemonCardImage = styled.img`
  width: 6rem;
  height: 6rem;
  margin: 1rem 0;
`;

export const PokemonCardName = styled.h3`
  text-transform: capitalize;
`;

export const PokemonCardTypes = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    margin: 0 auto;
  }
`;

type PokemonCardTypeProps = {
  type?: string;
};

export const PokemonCardType = styled.span<PokemonCardTypeProps>`
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  background-color: ${(props) => {
    switch (props.type) {
      case "grass":
        return "#CCCC99";
      case "poison":
        return "#CC0066";
      case "fire":
        return "#FF3333";
      case "flying":
        return "#FF99FF";
      case "water":
        return "#FF99FF";
      case "bug":
        return "#66FF66";
      case "normal":
        return "#00CCCC";
      case "electric":
        return "#66FF66";
      case "ground":
        return "#006633";
      case "fairy":
        return "#FF3366";
      case "fighting":
        return "#FF3333";
      case "psychic":
        return "#FF3366";
      case "rock":
        return "#006633";
      case "steel":
        return "#00CCCC";
      case "ice":
        return "#FF99FF";
      case "ghost":
        return "#CC0066";
      case "dragon":
        return "#CC0066";
      default:
        return "#00CCCC";
    }
  }};
`;
