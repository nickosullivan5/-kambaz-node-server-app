import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    release_date: Date,
    due_date: Date,
    due_time: String,

    total_points: Number,
    num_modules: Number,
    description: String,

    assignment_group: {
      type: String,
      enum: ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"],
    },

    submission_type: {
      type: String,
      enum: ["Online", "Physical"], // lowercase to match incoming data
    },

    online_entry_option: {
      type: [String], //
      enum: [
        "Text Entry",
        "Website URL",
        "Media Recordings",
        "Student Annotation",
        "File Uploads",
      ],
    },

    assign_to: String,
  },
  { collection: "assignments" }
);

export default schema;
