import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const Header = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Score = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
`;

export const Summary = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #666;
`;

export const Button = styled.button`
  background: black;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #333;
  }
`;
