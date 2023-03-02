import styled from "styled-components";

export const PokemonPreviewContainer = styled.div`
  width: 50%;
  position: relative;
`;

export const PokemonPreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  top: 50%;
  transform: translateY(-40%);
  position: fixed;
  width: 25vw;
  min-height: 20rem;
  background: white;
  border-radius: 1rem;

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  table {
    width: 80%;
    text-align: center;
  }

  td {
    padding: 0.25rem;
    text-transform: capitalize;
  }
`;

export const CardTitle = styled.h3`
  text-transform: capitalize;
  margin: 0.5rem 0;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 10rem;
`;
