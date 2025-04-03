import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import assignments from "../Database/assignments.js";
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}
export function deleteAssignment(assignmentId) {
    const { assignments } = Database; // Extract assignments from Database
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  console.log("server to update this: ",assignmentUpdates)
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
