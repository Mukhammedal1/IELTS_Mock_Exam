import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 150px auto;
  padding: 30px;
  border-radius: 12px;
  line-height: 2;
  border: 2px solid black;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #666;
`;

export const Button = styled.button`
  background: black;
  color: white;
  padding: 14px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  &:hover {
    background: #333;
  }
`;
