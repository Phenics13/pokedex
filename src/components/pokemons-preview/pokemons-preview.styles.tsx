import styled from "styled-components";
import pokemonLogo from "../../assets/pokemon-logo.png";

export const PokemonsPreviewContainer = styled.div`
  width: 100%;
`;

export const PokemonsList = styled.div`
  width: inherit;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media screen and (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const BaseButton = styled.button`
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 1rem;
  color: white;

  border: none;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  transition: all 0.2s ease-in-out;
`;

export const LoadMoreButton = styled(BaseButton)`
  background: #7e57c2;

  &:hover {
    background: #5e43e4;
  }
  &:disabled {
    background: #c3b7fe;
  }
`;

export const LoadPreviousButton = styled(BaseButton)`
  background: lightcoral;

  &:hover {
    background: coral;
  }
  &:disabled {
    background: #f8a2a2;
  }
`;

export const ButtonSpinner = styled.div`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;

  background-image: url(${pokemonLogo});
  background-color: white;
  border: 1px solid white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 50%;

  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const PokemonsInputsContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  @media screen and (max-width: 320px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
