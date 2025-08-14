import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAttemptAnswer,
  getAttemptAnswer,
  getAttemptAnswerById,
} from "../api/attemptAnswer";

interface AttemptAnswer {
  attemptId: string;
  questionId: string;
  choice: boolean;
}

export const useCreateAttemptAnswer = () => {
  return useMutation({
    mutationFn: createAttemptAnswer,
  });
};

export const useAttemptAnswer = () => {
  return useQuery<AttemptAnswer[]>({
    queryKey: ["question"],
    queryFn: getAttemptAnswer,
  });
};

export const useAttemptAnswerById = (attemptId?: string) => {
  return useQuery<AttemptAnswer[]>({
    queryKey: ["attemptAnswer", attemptId],
    queryFn: () => getAttemptAnswerById(attemptId as string),
    enabled: !!attemptId,
  });
};
