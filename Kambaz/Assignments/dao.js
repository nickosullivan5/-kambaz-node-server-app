// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}
export function createAssignment(assignment) {
 const newAssignment = { ...assignment, _id: uuidv4() };
 return model.create(newAssignment);
}
export function deleteAssignment(assignmentId) {
    // const { assignments } = Database; // Extract assignments from Database
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    //
     return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  // const { assignments } = Database;
  // console.log("server to update this: ",assignmentUpdates)
  // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  // Object.assign(assignment, assignmentUpdates);
  // return assignment;

   return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}
