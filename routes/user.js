const express = require('express');
const router = express.Router();
let auth = require('../middleware/auth');

router.get('/user', auth, function (req, res) {
    if (res.locals.user) {
        res.send({
            id: res.locals.user.id,
            login: res.locals.user.login,
            name: res.locals.user.name,
            surname: res.locals.user.surname,
            middlename: res.locals.user.middlename,
            manager: res.locals.user.manager
        });
    }
})

module.exports = router
