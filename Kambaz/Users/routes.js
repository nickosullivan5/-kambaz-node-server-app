import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    const createUser = (req, res) => {
    };
    const deleteUser = (req, res) => {
    };
      const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
      };

    const findUserById = (req, res) => {
    };
    const updateUser = async  (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = await dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };


    const signup = async  (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({message: "Username already taken"});
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const signin = async (req, res) => {
        const {username, password} = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({message: "Unable to login. Try again later."});
        }
    };


    const signout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };
    const findCoursesForEnrolledUser = async (req, res) => {
        let {userId} = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = await courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = await courseDao.createCourse(req.body);
        await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
        console.log(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);

    //need to retrieve courseid from path
    const unenrollFromCourse = async (req, res) => {
        try {
            const {cid} = req.params;
            const currentUser = req.session["currentUser"];
            console.log("trying to unenroll w/: " ,cid, currentUser)
            if (!currentUser) return res.status(401).json({error: "Unauthorized"});

            await enrollmentsDao.unenrollUserFromCourse(currentUser._id, cid);
            const updatedCourses = await courseDao.findCoursesForEnrolledUser(currentUser._id);
            res.json(updatedCourses);
        } catch (error) {
            console.error("Error unenrolling from course:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
    };
    app.delete("/api/users/current/courses/:cid/enrollments", unenrollFromCourse);


    const enrollInCourse = async (req, res) => {
        try {
            const {cid} = req.params;
            const currentUser = req.session["currentUser"];
            if (!currentUser) return res.status(401).json({error: "Unauthorized"});

            await enrollmentsDao.enrollUserInCourse(currentUser._id, cid);
            const updatedCourses = await courseDao.findCoursesForEnrolledUser(currentUser._id);
            res.json(updatedCourses);
        } catch (error) {
            console.error("Error enrolling in course:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
    };
    app.post("/api/users/current/courses/:cid/enrollments", enrollInCourse);

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}

