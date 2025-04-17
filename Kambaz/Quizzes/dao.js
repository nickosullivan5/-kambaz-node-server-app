import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuizzesForCourse(courseId) {
    const quizzes = model.find({ course: courseId }).exec();
  console.log("Found quizzes: ", quizzes);
return quizzes
}
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}