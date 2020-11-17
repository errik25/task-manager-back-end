const express = require("express");
const router = express.Router();
let auth = require("../middleware/auth");
const { Task } = require("../initDB");
const { User } = require("../initDB");
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
        { login: res.locals.user.login }
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
  console.log('updatedItem');
  console.log(updatedItem);
  await Task.update(
    {
      title: updatedItem.title,
      status: updatedItem.status,
      priority: updatedItem.priority,
      description: updatedItem.description,
      creator: updatedItem.creator,
      responsible: updatedItem.responsible,
      completionDate: updatedItem.completionDate,
    },
    {
      where: {
        creator: res.locals.user.login,
        id: +req.params.id,
      },
    }
  );
  res.sendStatus(200);
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
