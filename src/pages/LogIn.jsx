import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import backgroundImage from '../assets/images/4k_background.jpg'; // Adjust path based on project structure

// Styled-components for the LogIn page
const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LogInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #999358;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 10% auto 2rem;
  border-radius: 20px;
`;

const LogInTitle = styled.h1`
  font-size: 2.625rem; // 42px / 16 = 2.625rem
  font-family: "Archivo Narrow", sans-serif;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #000000;
  border-radius: 4px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const ReCAPTCHAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
`;

const SignUpText = styled.p`
  font-size: 1.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;
`;

const SignUpLink = styled(Link)`
  color: #F2E782;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogIn = () => {
  const recaptchaRef = useRef();

  const handleReCAPTCHAChange = (value) => {
    console.log('ReCAPTCHA token:', value);
    // For client-side only, the token is logged. Later, send to backend for verification.
  };

  return (
    <LogInContainer>
      <LogInFormContainer>
        <LogInTitle>Log In</LogInTitle>
        <Form>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" required />
          </FormGroup>
          <ReCAPTCHAContainer>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdiV4MrAAAAAGwvTBc3a_fGoW6Zqg4BMDK9jgCw" // Replace with your Site Key
              onChange={handleReCAPTCHAChange}
            />
          </ReCAPTCHAContainer>
        </Form>
        <SignUpText>
          Don’t have an account? <SignUpLink to="/signup">Sign up!</SignUpLink>
        </SignUpText>
      </LogInFormContainer>
    </LogInContainer>
  );
};

export default LogIn;