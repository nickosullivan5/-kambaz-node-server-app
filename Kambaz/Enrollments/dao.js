import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  //for enrollment in enrollments, delete any enrollment where enrollment._user = userId and enrollment.course = courseId
   Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}