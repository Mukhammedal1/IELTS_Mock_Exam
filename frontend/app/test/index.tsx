"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Header,
  ProgressBarWrapper,
  ProgressBar,
  QuestionText,
  Option,
  RadioInput,
  ButtonRow,
  Button,
} from "./test.style";
import { useQuestion } from "../../hooks/useQuestion";
import { useRouter } from "next/router";
import {
  useAttemptAnswer,
  useAttemptAnswerById,
  useCreateAttemptAnswer,
} from "../../hooks/useAttemptAnswer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function TestPage() {
  const router = useRouter();

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
    percentage: 0,
  });
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const id = localStorage.getItem("attemptId");
    setAttemptId(id);
  }, []);

  const { data: questions, isLoading } = useQuestion();
  const {
    data: answersById,
    isLoading: answersLoading,
    refetch,
  } = useAttemptAnswerById(attemptId as string);
  const { data: dbAnswers } = useAttemptAnswer();
  const { mutate: createAttemptAnswer } = useCreateAttemptAnswer();

  // answers — har bir questionId ga tanlangan choiceId saqlanadi
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // oldingi javoblarni yuklash
  useEffect(() => {
    if (dbAnswers) {
      const mapped: { [key: string]: string } = {};
      dbAnswers.forEach((a) => {
        mapped[a.questionId] = a.choice ? "true" : "false"; // boolean => string sifatida
      });
      setAnswers(mapped);
    }
  }, [dbAnswers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish(); // vaqt tugasa avtomatik yakunlash
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (isLoading || !attemptId) return <Container>Yuklanmoqda...</Container>;
  if (!questions || questions.length === 0)
    return <Container>Questions not added</Container>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (choiceId: string) => {
    const selectedOption = currentQuestion.choices.find(
      (opt) => opt._id === choiceId
    );
    if (!selectedOption) return;

    // frontendda tanlangan variantni saqlaymiz
    setAnswers({
      ...answers,
      [currentQuestion._id]: choiceId,
    });

    // backendga boolean yuboramiz
    createAttemptAnswer(
      {
        attemptId: attemptId as string,
        questionId: currentQuestion._id,
        choice: selectedOption.isCorrect,
      },
      {
        onError: (error) => console.error("Xatolik:", error),
        onSuccess: () => console.log("Javob saqlandi"),
      }
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleFinish = async () => {
    // backenddan qayta yuklash
    const { data } = await refetch();
    if (!data) return;

    let correctCount = 0;
    let incorrectCount = 0;

    data.forEach((answer) => {
      if (answer.choice) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const total = correctCount + incorrectCount;
    const percentage = total > 0 ? (correctCount / total) * 100 : 0;

    setResult({
      correct: correctCount,
      incorrect: incorrectCount,
      percentage: parseFloat(percentage.toFixed(2)),
    });

    setResultOpen(true);
  };
  const handleCloseModal = () => {
    router.push({
      pathname: "/startPage",
    });
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Container>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          Savol {currentIndex + 1} / {questions.length}
        </span>
        <span
          style={{ fontWeight: "bold", color: timeLeft < 60 ? "red" : "black" }}
        >
          ⏳ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </Header>

      <ProgressBarWrapper>
        <ProgressBar progress={progress} />
      </ProgressBarWrapper>

      <QuestionText>{currentQuestion.text}</QuestionText>

      {currentQuestion.choices.map((opt) => (
        <Option key={opt._id}>
          <RadioInput
            type="radio"
            name={currentQuestion._id}
            checked={answers[currentQuestion._id] === opt._id}
            onChange={() => handleSelect(opt._id)}
          />
          {opt.text}
        </Option>
      ))}

      <ButtonRow>
        <Button disabled={currentIndex === 0} onClick={handlePrev}>
          Oldingi
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button disabled={!answers[currentQuestion._id]} onClick={handleNext}>
            Keyingi
          </Button>
        ) : (
          <Button disabled={answersLoading || Object.keys(answers).length < questions.length} onClick={handleFinish}>
            Yakunlash
          </Button>
        )}
      </ButtonRow>

      <Dialog
        PaperProps={{
          style: {
            width: "500px",
            // height: "200px",
          },
        }}
        open={resultOpen}
        onClose={() => setResultOpen(false)}
      >
        <DialogTitle sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Natijalar
        </DialogTitle>
        <DialogContent sx={{ minHeight: "200px", bgcolor: "#f8f8f8" }}>
          <p>✅ To‘g‘ri javoblar: {result.correct}</p>
          <p>❌ Noto‘g‘ri javoblar: {result.incorrect}</p>
          <p>📊 Foiz: {result.percentage}%</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Yopish</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
