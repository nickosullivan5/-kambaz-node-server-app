import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAnswerForUser(userId, quizId, courseId) {

  const answer = model.findOne({ user: userId, quiz: quizId, course: courseId });
  console.log("found answer: ", answer)
  return answer
}
export function createAnswer(answer) {
  const newAnswer = { ...answer, _id: uuidv4() };
    console.log("created answer:" , newAnswer)
  return model.create(newAnswer);
}
export function updateAnswer(answerId, answerUpdates) {
  return model.updateOne({ _id: answerId }, answerUpdates);
}