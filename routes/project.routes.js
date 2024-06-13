const Project = require("../models/project.model");

const router = require("express").Router();

//CREATE THE PROJECT
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const created = await Project.create({ title, description });
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET ALL PROJECTS AND POPULATES TASKS ARRAY
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");

    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GETS A SINGLE PROJECT AND POPULATES TASKS ARRAY
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("tasks");

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//UPDATE A SINGLE PROJECT
router.put("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const editedProject = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });

    res.json(editedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//REMOVE A TASK FROM A PROJECT
router.put("/:projectId/task/:taskId/delete", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskId } = req.params;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { tasks: taskId } },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE A SINGLE PROJECT
router.delete("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndDelete(projectId);
    res.json({ message: "Project was deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
