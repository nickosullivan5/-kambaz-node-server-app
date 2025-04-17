import mongoose from "mongoose";

const baseQuestionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    points: { type: Number, required: true },
    questionText: { type: String, required: true }
  },
  { discriminatorKey: 'type', _id: false }
);

const multipleChoiceSchema = new mongoose.Schema(
  {
    choices: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true }
  }, { _id: false }
);

const trueFalseSchema = new mongoose.Schema(
  {
    correctAnswer: { type: Boolean, required: true }
  }, { _id: false }
);

const fillInTheBlankSchema = new mongoose.Schema(
  {
    possibleAnswers: { type: [String], required: true }
  }, { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    course: { type: String, ref: "CourseModel" },
    description: String,
    quizType: { type: String, required: true },
    points: { type: Number, required: true },
    assignmentGroup: String,
    shuffleAnswers: { type: Boolean, required: true },
    timeLimit: { type: Number, required: true },
    multipleAttempts: { type: Boolean, required: true },
    showCorrectAnswers: { type: String, required: true },
    accessCode: { type: String, required: true },
    oneQuestionAtATime: { type: Boolean, required: true },
    webcamRequired: { type: Boolean, requried: true },
    lockQuestionsAfterAnswering: { type: Boolean, required: true },
    dueDate: { type: String, required: true },
    availableDate: { type: String, required: true },
    untilDate: { type: String, required: true },
    published: { type: Boolean, required: true },
    questions: [baseQuestionSchema]
  },
  { collection: "quizzes" }
);

quizSchema.path('questions').discriminator('multiple_choice', multipleChoiceSchema);
quizSchema.path('questions').discriminator('true_false', trueFalseSchema);
quizSchema.path('questions').discriminator('fill_in_blank', fillInTheBlankSchema);

export default quizSchema;