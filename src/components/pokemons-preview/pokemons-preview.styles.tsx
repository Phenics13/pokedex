import styled from "styled-components";

export const PokemonsPreviewContainer = styled.div`
  width: 100%;
`;

export const PokemonsList = styled.div`
  width: inherit;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
