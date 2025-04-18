import express from 'express'
import mongoose from "mongoose";

import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import AnswersRoutes from "./Kambaz/Answers/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING, {})
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your app or run your queries here
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:5173",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true, // important for trusting headers from Netlify

};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
Lab5(app)
// Hello(app)
ModuleRoutes(app);
AssignmentRoutes(app);
QuizzesRoutes(app);
AnswersRoutes(app);
app.listen(process.env.PORT || 4000)

