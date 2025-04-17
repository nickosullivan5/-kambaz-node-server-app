import * as answersDao from "./dao.js";

export default function AnswerRoutes(app) {
  app.put("/api/answers/:answerId", async (req, res) => {
    const {answerId} = req.params;
    const answerUpdates = req.body;
    const status = await answersDao.updateAnswer(answerId, answerUpdates);
    res.send(status);
  });
}