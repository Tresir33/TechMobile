import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/images/S24_Ultra_display.webp'; // Adjust path based on project structure

// Styled-components for the Contact page
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContactFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18528B;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 10% auto 2rem;
  border-radius: 10px;
`;

const ContactTitle = styled.h1`
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

const TextArea = styled.textarea`
  background-color: #ffffff;
  border: none;
  padding: 0.75rem;
  font-size: 1 Integrate ReCAPTCHA into Contact.jsx.5rem; // 24px / 16 = 1.5rem
  font-family: "Tenor Sans", sans-serif;
  color: #000000;
  border-radius: 4px;
  min-height: 150px; // Larger height for Message field
  resize: vertical;
  &::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactFormContainer>
        <ContactTitle>Contact Us</ContactTitle>
        <Form>
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input type="text" id="subject" placeholder="Enter the subject" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" placeholder="Enter your message" required />
          </FormGroup>
        </Form>
      </ContactFormContainer>
    </ContactContainer>
  );
};

export default Contact;