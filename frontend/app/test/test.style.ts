import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  font-family: Arial, sans-serif;
`;

export const Header = styled.h3`
  font-weight: bold;
`;

export const ProgressBarWrapper = styled.div`
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin: 15px 0;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: black;
  border-radius: 3px;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`;

export const QuestionText = styled.h4`
  margin-bottom: 20px;
`;

export const Option = styled.label`
  display: block;
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;

export const RadioInput = styled.input`
  margin-right: 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? "#e0e0e0" : "#000")};
  color: ${({ disabled }) => (disabled ? "#888" : "#fff")};
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
