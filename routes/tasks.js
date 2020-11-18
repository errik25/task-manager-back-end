const express = require("express");
const router = express.Router();
let auth = require("../middleware/auth");
const { Task, User } = require("../initDB");
const { Op } = require("sequelize");

router.get("/tasks", auth, async function (req, res) {
  const tasks = await Task.findAll({
    attributes: { exclude: [] },
    where: {
      [Op.or]: [
        { creator: res.locals.user.login },
        { responsible: res.locals.user.login },
      ],
    },
  });
  res.send(tasks);
});

router.get("/tasks/:id", auth, async function (req, res) {
  const tasks = await Task.findOne({
    attributes: { exclude: [] },
    where: {
      [Op.or]: [
        { creator: res.locals.user.login },
        { responsible: res.locals.user.login },
      ],
      id: +req.params.id,
    },
  });
  res.send(tasks);
});

router.post("/tasks", auth, async function (req, res) {
  taskExecutor = await User.findOne({
    attributes: { exclude: [] },
    where: {
      login: req.body.responsible,
      [Op.or]: [
        { manager: res.locals.user.login },
        { login: res.locals.user.login },
      ],
    },
  });

  if (!taskExecutor) {
    return res.sendStatus(403);
  }
  const item = {
    title: req.body.title,
    status: req.body.status,
    priority: req.body.priority,
    description: req.body.description,
    creator: res.locals.user.login,
    responsible: req.body.responsible,
    completionDate: req.body.completionDate,
  };
  const newItem = await Task.create({
    ...item,
    creator: res.locals.user.login,
  });
  res.send(newItem);
});

router.put("/tasks/:id", auth, async function (req, res) {
  const updatedItem = req.body;
  const task = await Task.findOne({
    attributes: { exclude: [] },
    where: {
      id: +req.params.id,
    },
  });
  if (!task ||
      !(res.locals.user.login === task.creator ||
      res.locals.user.login === task.responsible)
  ) {
    return res.sendStatus(403);

  } else if (res.locals.user.login === task.creator) {
    task.title = updatedItem.title;
    task.status = updatedItem.status;
    task.priority = updatedItem.priority;
    task.description = updatedItem.description;
    task.responsible = updatedItem.responsible;
    task.completionDate = updatedItem.completionDate;
    await task.save();

  } else if (res.locals.user.login === task.responsible) {
    task.status = updatedItem.status;
    await task.save();
  }

  res.send(task);
});

router.delete("/tasks/:id", auth, async function (req, res) {
  await Task.destroy({
    where: {
      id: +req.params.id,
      creator: res.locals.user.login,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
