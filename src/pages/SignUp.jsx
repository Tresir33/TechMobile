import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import galaxyImage from '../assets/images/galaxy-s24-ultra-4k.jpg';

// Styled-components
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #434341;
`;

const GalaxyImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
`;

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 5% auto;
`;

const SignUpTitle = styled.h1`
  font-size: 2.625rem;
  font-family: "Archivo Narrow", sans-serif;
  color: #F2E782;
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
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #999358;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Select = styled.select`
  background-color: #999358;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: var(--box, #999358);
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

const LoginText = styled.p`
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  text-align: center;
  margin-top: 1.5rem;
`;

const LoginLink = styled(Link)`
  color: #F2E782;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dob: '',
    gender: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRecaptcha = (token) => {
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Submitting signup request:', { ...formData, password: '[REDACTED]' });
      // Map gender to numeric values
      const genderMap = { male: 1, female: 2, other: 3 };
      const genderValue = genderMap[formData.gender] || null;

      // Send data to backend
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          surname: formData.surname,
          phone_number: null,
          date_of_birth: formData.dob,
          gender: genderValue,
          role: formData.role,
          recaptchaToken
        })
      });

      const result = await response.json();
      console.log('Backend response:', result);
      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      // Clear form and redirect
      setFormData({
        name: '',
        surname: '',
        dob: '',
        gender: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setRecaptchaToken(null);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
    }
  };

  return (
    <SignUpContainer>
      <GalaxyImage src={galaxyImage} alt="Galaxy S24 Ultra" />
      <SignUpFormContainer>
        <SignUpTitle>Sign Up</SignUpTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="surname">Surname</Label>
            <Input
              type="text"
              id="surname"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </Select>
          </FormGroup>
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
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptcha}
              />
            ) : (
              <ErrorMessage>reCAPTCHA site key is missing</ErrorMessage>
            )}
          </FormGroup>
          <SubmitButton type="submit" disabled={!recaptchaToken}>
            Sign Up
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <LoginText>
          Already have an account? <LoginLink to="/login">Log in!</LoginLink>
        </LoginText>
      </SignUpFormContainer>
    </SignUpContainer>
  );
};

export default SignUp;