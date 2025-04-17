import mongoose from "mongoose";
const answerSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    user: { type: String, ref: "UserModel" },
    course: { type: String, ref:"CourseModel" },
    grade: Number,
    date: Date,
    attemptNum: Number,
    attemptMax: Number,
    answers: []
  },
  { collection: "answers" }
);
export default answerSchema;