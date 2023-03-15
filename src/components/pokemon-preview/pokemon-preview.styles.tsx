import styled from "styled-components";

type PokemonPreviewContainerProps = {
  isOpen?: boolean;
};

export const PokemonPreviewContainer = styled.div<PokemonPreviewContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 50%;
  position: relative;

  @media screen and (max-width: 780px) {
    width: 60%;
  }

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: absolute;
    background-color: rgba(1, 1, 1, 0.2);
  }
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

  @media screen and (max-width: 768px) {
    width: 35vw;
  }

  @media screen and (max-width: 480px) {
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 0;
    width: 65vw;
  } ;
`;

export const CardTitle = styled.h3`
  text-transform: capitalize;
  margin: 0.5rem 0;
`;

export const CardImage = styled.img`
  height: 10rem;

  @media screen and (max-width: 780px) {
    height: 8rem;
  }

  @media screen and (max-width: 480px) {
    height: 10rem;
  } ;
`;
