import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAnswerForUser(userId, quizId, courseId) {
  return model.findOne({ user: userId, quiz: quizId, course: courseId });
}
export function createAnswer(answer) {
  const newAnswer = { ...answer, _id: uuidv4() };
  return model.create(newAnswer);
}
export function updateAnswer(answerId, answerUpdates) {
  return model.updateOne({ _id: answerId }, answerUpdates);
}