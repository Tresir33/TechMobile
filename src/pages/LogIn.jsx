import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js'; // Updated import
import backgroundImage from '../assets/images/4k_background.jpg';

// Styled-components
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
  font-size: 2.625rem;
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
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
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

const SubmitButton = styled.button`
  background-color: var(--item-bg, #18528B);
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FF5555;
  text-align: center;
`;

const SignUpText = styled.p`
  font-size: 1.5rem;
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
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const recaptchaRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleReCAPTCHAChange = (token) => {
    setRecaptchaToken(token);
    setError('');
    console.log('reCAPTCHA token:', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA');
      return;
    }

    try {
      console.log('Submitting login request:', { email: formData.email, password: '[REDACTED]' });
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Login successful, redirecting to Home');
      setFormData({ email: '', password: '' });
      setRecaptchaToken(null);
      recaptchaRef.current.reset();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message.includes('auth/invalid-credential') ? 'Invalid email or password' : error.message);
    }
  };

  return (
    <LogInContainer>
      <LogInFormContainer>
        <LogInTitle>Log In</LogInTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <ReCAPTCHAContainer>
            {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleReCAPTCHAChange}
              />
            ) : (
              <ErrorMessage>reCAPTCHA site key is missing</ErrorMessage>
            )}
          </ReCAPTCHAContainer>
          <SubmitButton type="submit" disabled={!recaptchaToken}>
            Log In
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <SignUpText>
          Don’t have an account? <SignUpLink to="/signup">Sign up!</SignUpLink>
        </SignUpText>
      </LogInFormContainer>
    </LogInContainer>
  );
};

export default LogIn;