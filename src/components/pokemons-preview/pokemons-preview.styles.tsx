import styled from "styled-components";

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

export const PokemonsButton = styled.button`
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 1rem;
  color: white;
  background: #6e53f4;
  border: none;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #5e43e4;
  }
`;

export const ButtonSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 100%;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
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
