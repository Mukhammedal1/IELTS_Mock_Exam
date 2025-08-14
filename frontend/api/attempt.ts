import instance from "./instance";

interface Attempt {
  status: string;
  score: number;
  total: number;
  percent: number;
}

export const createAttempt = async (data: Attempt) => {
  try {
    const res = await instance.post("/attempts", data);
    return res.data;
  } catch (e) {
    console.error("attempt not added");
  }
};
