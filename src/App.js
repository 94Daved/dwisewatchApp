import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import { mobile, iPad } from "./utils/responsive";

const Container = styled.div`
  display: flex;
  max-width: 100vw;
  min-height: 100vh;
`;

const Main = styled.div`
  position: relative;
  flex: 7;
  background-color: ${({ theme }) => theme.bgPlaceHolder};
`;

const Welcome = styled.div`
  display: flex;
  height: 100%;
`;
const Wrapper = styled.div`
  padding: 22px 96px;
  margin-left: 58px;
  ${mobile({
    padding: "22px 20px",
    marginLeft: "0",
    display: "flex",
    justifyContent: "center",
  })}
  ${iPad({ padding: "22px 40px", marginLeft: "58px" })}
  min-height: calc(100% - 56px);
  flex: 21;
`;

const TransparentSheet = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  margin: auto;
  display: ${({ openMenu }) => !openMenu && "none"};
  transition: ease-in-out 0.05s;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Main>
            <Navbar setOpenMenu={setOpenMenu} openMenu={openMenu} />
            <TransparentSheet
              onClick={() => setOpenMenu(!openMenu)}
              openMenu={!openMenu}
            ></TransparentSheet>
            <Menu
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              openMenu={openMenu}
            />
            <Welcome>
              <Sidebar />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            </Welcome>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
