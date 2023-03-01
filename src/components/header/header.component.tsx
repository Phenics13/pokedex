import pokemonLogo from "../../assets/pokemon-logo.png";

import { HeaderContainer, HeaderImage, HeaderTitle } from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderImage src={pokemonLogo} alt="Pokemon Logo" />
      <HeaderTitle>Pokedex</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
