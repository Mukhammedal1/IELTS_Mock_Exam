import React from "react";
import { Container, Header, Score, Summary, Button } from "./result.style";

interface ResultPageProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ResultPage({
  score,
  total,
  onRestart,
}: ResultPageProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <Container>
      <Header>Test Completed 🎉</Header>
      <Score>
        Your Score: {score} / {total}
      </Score>
      <Summary>Percentage: {percentage}%</Summary>
      <Button onClick={onRestart}>Try Again</Button>
    </Container>
  );
}
