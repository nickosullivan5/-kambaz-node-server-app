import model from "./model.js";
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");

  const uniqueCoursesMap = new Map();
  enrollments.forEach(({ course }) => {
    if (course && !uniqueCoursesMap.has(course._id.toString())) {
      uniqueCoursesMap.set(course._id.toString(), course);
    }
  });
  return Array.from(uniqueCoursesMap.values());
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
 const newEnrollment = { user, course, _id: `${user}-${course}` };
 return model.create(newEnrollment);
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}

