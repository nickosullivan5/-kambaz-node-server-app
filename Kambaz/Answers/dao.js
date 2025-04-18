import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAnswerForUser(userId, quizId, courseId) {
  return model.findOne({ user: userId, quiz: quizId, course: courseId });
}
export function createAnswer(answer) {
  const newAnswer = { ...answer, _id: uuidv4() };
    console.log("created answer:" , newAnswer)
  return model.create(newAnswer);
}
export function updateAnswer(answerId, answerUpdates) {
  const updatedAnswer =  model.updateOne({ _id: answerId }, answerUpdates);
  console.log("updated answer:" , updatedAnswer)
  return updatedAnswer
}