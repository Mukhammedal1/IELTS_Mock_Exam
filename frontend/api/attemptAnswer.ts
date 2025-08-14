import instance from "./instance";

interface AttemptAnswer {
  attemptId: string;
  questionId: string;
  choice: any;
}

export const createAttemptAnswer = async (data: AttemptAnswer) => {
  try {
    const res = await instance.post("/attempt-answer", data);
    return res.data;
  } catch (e) {
    console.error("attemptanswer not added");
  }
};

export const getAttemptAnswer = async () => {
  try {
    const res = await instance.get("/attempt-answer");
    return res.data;
  } catch (e) {
    console.error("Failed to fetch answers!");
  }
};

export const getAttemptAnswerById = async (attemptId?: string) => {
  try {
    const res = await instance.get(`/attempt-answer/attempt/${attemptId}`);
    return res.data;
  } catch (e) {
    console.error("Failed to fetch answers!", e);
  }
};
