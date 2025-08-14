import React from "react";
import { Container, Title, Description, Button } from "./start.style";
import { useCreateAttempt } from "../../hooks/useAttempt";
import { useQuestion } from "../../hooks/useQuestion";
import { useRouter } from "next/router";

export default function StartPage() {
  const { mutate: createAttempt } = useCreateAttempt();
  const { data: questions } = useQuestion();
  const router = useRouter();

  const handleClick = () => {
    createAttempt(
      {
        status: "in_progress",
        score: 0,
        total: questions!.length,
        percent: 0,
      },
      {
        onError: (error) => {
          console.error("Xatolik:", error);
        },
        onSuccess: (data) => {
          console.log("Yangi urinish yaratildi:", data);
          localStorage.setItem("attemptId", data._id);
          router.push({
            pathname: "/testPage",
          });
        },
      }
    );
  };

  return (
    <Container>
      <Title>Welcome to the IELTS Mock Exam 📝</Title>
      <Description>
        You will have 10 minutes to answer all the questions. Good luck!
      </Description>
      <Button onClick={handleClick}>Start Exam</Button>
    </Container>
  );
}
