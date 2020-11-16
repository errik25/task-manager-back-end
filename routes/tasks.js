const express = require('express');
const router = express.Router();
let auth = require('../middleware/auth')
const {Task} = require('../initDB');

router.get('/tasks', auth, async function (req, res) {
    const tasks = await Task.findAll(
        {
            attributes: {exclude: []},
            where: {creator: res.locals.user.login}
        })
    res.send(tasks);
})

router.get('/tasks/:id', auth, async function (req, res) {
    const tasks = await Task.findOne(
        {
            attributes: {exclude: []},
            where: {creator: res.locals.user.login, id: +req.params.id}
        })
    res.send(tasks);
})

router.post('/tasks', auth, async function (req, res) {
    const item = {
        title: req.body.title,
        checked: req.body.checked
    }
    const newItem = await Task.create({
        ...item,
        creator: res.locals.user.login,
    });
    res.send(newItem);
})

router.put('/tasks/:id', auth, async function (req, res) {
    const updatedItem = req.body;
    await Task.update(
        {
            title: updatedItem.title,
            status: updatedItem.status,
            priority: updatedItem.priority,
            description: updatedItem.description,
            creator: updatedItem.creator,
            responsible: updatedItem.responsible,
            completionDate: updatedItem.completionDate,
        }, {
            where: {
                creator: res.locals.user.login,
                id: +req.params.id
            }
        });
    res.sendStatus(200);
})

router.delete('/tasks/:id', auth, async function (req, res) {
    await Task.destroy({
        where: {
            id: +req.params.id,
            creator: res.locals.user.login
        }
    });
    res.sendStatus(200);
})

module.exports = router
