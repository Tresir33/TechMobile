import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import galaxyImage from '../assets/images/galaxy-s24-ultra-4k.jpg'; // Adjusted path to match Header.jsx structure

// Styled-components for the SignUp page
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
  font-size: 2.625rem; // 42px / 16 = 2.625rem
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
  font-size: 1.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #999358;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem; // 24px / 16 = 1.5rem
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
  font-size: 1.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
`;

const LoginText = styled.p`
  font-size: 1.5rem; // 24px / 16 = 1.5rem
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
  return (
    <SignUpContainer>
      <GalaxyImage src={galaxyImage} alt="Galaxy S24 Ultra" />
      <SignUpFormContainer>
        <SignUpTitle>Sign Up</SignUpTitle>
        <Form>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Enter your name" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="surname">Surname</Label>
            <Input type="text" id="surname" placeholder="Enter your surname" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" id="dob" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <Select id="role" required>
              <option value="">Select role</option>
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input type="password" id="confirm-password" placeholder="Confirm your password" required />
          </FormGroup>
        </Form>
        <LoginText>
          Already have an account? <LoginLink to="/login">Log in!</LoginLink>
        </LoginText>
      </SignUpFormContainer>
    </SignUpContainer>
  );
};

export default SignUp;