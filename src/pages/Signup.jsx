import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestResponse";
import { mobile, iPad } from "../utils/responsive";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 80px;
  left: 80px;
  z-index: 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  ${mobile({ display: "none" })}
  ${iPad({ display: "none" })}
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const MoreLinks = styled.div`
  margin-left: 50px;
`;

const OneLink = styled.span`
  margin-left: 30px;
`;

const LoginOptions = styled.span`
  font-size: 12px;
  color: inherit;
  text-align: center;
`;
const ErrorMessage = styled.span`
  text-align: center;
  color: red;
  font-size: 14px;
`;

const SignUp = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicRequest.post("/auth/signup", {
        name,
        email,
        password,
      });
      navigate("/signin");
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign up</Title>
        <SubTitle>to continue to dWiseTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup} disabled={loading}>
          {error && <ErrorMessage>Failed to signup</ErrorMessage>}
          Sign up
        </Button>

        <LoginOptions>
          Already have an account? <Link to="/signin"> signin</Link>
        </LoginOptions>
      </Wrapper>
      <More>
        English(USA)
        <MoreLinks>
          <OneLink>Help</OneLink>
          <OneLink>Privacy</OneLink>
          <OneLink>Terms</OneLink>
        </MoreLinks>
      </More>
    </Container>
  );
};

export default SignUp;
