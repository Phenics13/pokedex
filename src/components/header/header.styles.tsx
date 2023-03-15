import styled from "styled-components";

export const HeaderContainer = styled.header`
  margin: 2rem auto;
  padding: 1rem 0;
  width: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: #ef5350;

  @media screen and (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

export const HeaderImage = styled.img`
  width: 3rem;
  height: 3rem;

  background: white;
  border-radius: 50%;
  border: 3px solid white;
  margin-right: 1rem;

  @media screen and (max-width: 480px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const HeaderTitle = styled.h1``;
