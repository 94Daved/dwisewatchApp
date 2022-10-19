import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { Link } from "react-router-dom";
import LamaTube from "../img/logo.png";
import { useState } from "react";
import { mobile, iPad } from "../utils/responsive";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  height: 56px;
  opacity: 0.95;
`;

const HamburgContainer = styled.div`
  display: flex;
  margin-right: 15px;
  ${mobile({ marginRight: "0px" })}
  height: 35px;
  border: 1px solid tranparent;
  width: 35px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:active {
    background-color: ${({ theme }) => theme.bgSearchButton};
    transition: all 0.15s;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  height: 100%;
  padding: 0px 25px;
`;

const Search = styled.div`
  width: 52%;
  max-width: 600px;
  ${mobile({ width: "100%" })}
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgPlaceHolder};
  padding: 0 0 0 5px;
  border-radius: 3px;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  border: none;
  width: 78%;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: inherit;
  &::placeholder {
    color: ${({ theme }) => theme.text};
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  ${mobile({ padding: "3px 10px" })}
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  padding: 5px 15px;
  ${mobile({ padding: "3px 10px" })}
  color: inherit;
  background-color: ${({ theme }) => theme.bgSearchButton};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const VoiceSearchButton = styled.button`
  display: flex;
  ${mobile({ display: "none" })}
  align-items: center;
  color: inherit;
  cursor: pointer;
  justify-content: center;
  width: 37px;
  height: 37px;
  margin-left: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bgPlaceHolder};
  border: none;
`;

const Img = styled.img`
  height: 25px;
`;

const Logo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

const LeftPosition = styled.div`
  display: flex;
  align-items: center;
  flex: 1.45;
  ${mobile({ flex: "0.5" })}
  ${iPad({ flex: "0.5" })}
  display: flex;
  color: inherit;
`;
const MiddlePosition = styled.div`
  display: flex;
  justify-content: center;
  flex: 11;
  padding: 0px 10px;
`;
const RightPosition = styled.div`
  flex: 1.4;
  display: flex;
  justify-content: flex-end;
  margin-left: 10px;
`;

const iconStyle = {
  color: "inherit",
  fontSize: 25,
  height: 25,
  cursor: "pointer",
};

const buttonIconStyle = {
  color: "inherit",
  fontSize: 25,
  height: 25,
  cursor: "pointer",
};

const Navbar = ({ setOpenMenu, openMenu }) => {
  //const [searchText, setSearchText] = useState("");

  return (
    <Container>
      <Wrapper>
        <LeftPosition setOpenMenu={setOpenMenu}>
          <HamburgContainer>
            <MenuIcon
              style={iconStyle}
              onClick={() => setOpenMenu(!openMenu)}
            />
          </HamburgContainer>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={LamaTube} />
              dWiseTube
            </Logo>
          </Link>
        </LeftPosition>
        <MiddlePosition>
          <Search>
            <Input placeholder="Search" />
            <SearchButton>
              <SearchOutlinedIcon style={buttonIconStyle} />
            </SearchButton>
          </Search>
          <VoiceSearchButton>
            <KeyboardVoiceIcon style={buttonIconStyle} />
          </VoiceSearchButton>
        </MiddlePosition>
        <RightPosition>
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </RightPosition>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
