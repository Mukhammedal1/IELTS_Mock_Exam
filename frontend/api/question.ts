import instance from "./instance";

export const getQuestions = async () => {
  try {
    const res = await instance.get("/questions");
    return res.data;
  } catch (e) {
    console.error("Failed to fetch questions!");
  }
};
