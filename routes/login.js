const express = require('express');
const router = express.Router();
const {User} = require('../initDB');

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");

router.post('/login', async function (req, res) {
    const {login, password} = req.body;
    if (!(req.body.login && req.body.password)) {
        return res.json({
            error: true,
            message: 'Login and password is required'
        })
    }
    const user = await User.findOne(
        {
            attributes: {exclude: []},
            where: {login: login}
        });

    if (!user) {
        return res.json({
            error: true,
            message: 'This user isn\'t registered'
        })
    }
    if (user && md5(password) === user.passwordHash) {
        const token = generateToken({name: user.name, surname: user.surname, login: user.login});
        await User.update({bearerToken: token}, {
            where: {
                login: user.login
            }
        });
        res.cookie('token', token).send(token)
    } else {
        console.log('wrong pass', md5(password), user.passwordHash)
        res.json({
            error: true,
            message: 'wrong password'
        })
    }

})

router.post('/register', async function (req, res) {
    const {login, password, name, surname, middleName, manager} = req.body;
    const user = await User.findOne(
        {
            attributes: {exclude: []},
            where: {login: login}
        });

    if (user) {
        res.status(401).send({errorType: 'loginIsBusy'})
    } else {
        const newUser = await User.create({
            name,
            surname,
            login,
            middlename,
            manager,
            passwordHash: md5(password),
        });
        res.send({
            login: newUser.login,
            name: newUser.name,
            surname: newUser.surname,
            middlename: newUser.middlename,
            manager: newUser.manager
        })
    }
})

router.post('/logout', auth, async function (req, res) {
    await User.update({bearerToken: null}, {
        where: {
            bearerToken: res.locals.user.bearerToken
        }
    });
    res.sendStatus(200)
})

function generateToken(user) {
    if (!user) {
        return null
    }
    const token = jwt.sign(user, process.env.JWT_SECRET)
    return token;
}

module.exports = router
