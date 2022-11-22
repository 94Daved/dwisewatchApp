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
import { mobile, iPad, semiMonitor, normalMonitor } from "./utils/responsive";
import { useSelector } from "react-redux";
import SignUp from "./pages/Signup";
import NotFound from "./components/NotFound";
import Search from "./pages/Search";
import Channel from "./pages/Channel";

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
  position: relative;
`;
const Wrapper = styled.div`
  margin
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 22px 90px;
  ${mobile({
    padding: "22px 10px",
    marginLeft: "0",
    display: "flex",
  })}
  ${iPad({ padding: "22px 40px" })}
  ${semiMonitor({ padding: "22px 40px" })}
  ${normalMonitor({ padding: "22px 50px" })}
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
                    <Route index element={<Home type="random" />} />
                    <Route path="/trends" element={<Home type="trend" />} />
                    <Route path="/subcriptions" element={<Home type="sub" />} />
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/video">
                      <Route index path=":id" element={<Video />} />
                    </Route>
                    <Route path="/search" element={<Search />} />
                    <Route path="/channel">
                      <Route index path=":id" element={<Channel />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFound />} />
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
