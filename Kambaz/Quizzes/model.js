import mongoose from "mongoose";
import quizSchema from "./schema.js";
const model = mongoose.model("QuizModel", schema);
export default model;