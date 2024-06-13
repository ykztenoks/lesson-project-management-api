const router = require("express").Router();
const Task = require("../models/task.model.js");
const Project = require("../models/project.model.js");

router.post("/", async (req, res) => {
  try {
    const { title, description, projectId } = req.body;

    const createdTask = await Task.create({
      title,
      description,
      project: projectId,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { tasks: createdTask._id } },
      { new: true }
    );

    //ANOTHER APPROACH TO STORE CREATED TASK IN PROJECTS TASK LIST
    // const projectToUpdate = await Project.findById(projectId)
    // projectToUpdate.tasks.push(createdTask._id)
    // projectToUpdate.save()

    res.status(201).json({ response: { createdTask, updatedProject } });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE A TASK AND REMOVE IT FROM PROJECT
router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const taskToDelete = await Task.findById(taskId);

    await Project.findByIdAndUpdate(taskToDelete.project, {
      $pull: { tasks: taskId },
    });

    await Task.deleteOne(taskToDelete);

    res.json({ message: "Task deleted and removed from project succesfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
