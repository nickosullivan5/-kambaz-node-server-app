const module = {
    id: "M101",
  name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
    lessons: [
        {
            "_id": "L101",
            "name": "History of Rocketry",
            "description": "A brief history of rocketry and space exploration.",
            "module": "M101"
        }
    ]
};
export default function Module(app) {
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
        const {newName} = req.params;
        module.name = newName;
        res.json(module);
    });
      app.get("/lab5/module/name/:newId", (req, res) => {
        const {newId} = req.params;
        module.id = newId;
        res.json(module);
    });

};
