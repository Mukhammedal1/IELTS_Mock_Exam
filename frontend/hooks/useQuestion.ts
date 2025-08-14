import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/question";

interface Choice {
  text: string;
  isCorrect: boolean;
  _id: string;
}

interface Question {
  _id: string;
  text: string;
  choices: Choice[];
}

export const useQuestion = () => {
  return useQuery<Question[]>({
    queryKey: ["question"],
    queryFn: getQuestions,
  });
};
