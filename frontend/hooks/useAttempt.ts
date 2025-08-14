import { useMutation } from "@tanstack/react-query";
import { createAttempt } from "../api/attempt";

export const useCreateAttempt = () => {
  return useMutation({
    mutationFn: createAttempt,
  });
};
