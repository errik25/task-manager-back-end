const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/users.db'
});

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })()

class User extends Model {}
class ToDo extends Model {}

ToDo.init({
    title: {
        type: DataTypes.TEXT
    },
    checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1
    },
    userId: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'todo' // We need to choose the model name
});
User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.TEXT
    },
    secondName: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1
    },
    bearerToken: {
        type: DataTypes.TEXT
    },
    passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    login: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});


//
// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
// })();


// read user
// (async () => {
//     const myUser = await User.findOne(
//         {
//             attributes: {exclude: []},
//             where: {login: 'erik'}
//         })
//     console.log('myUser')
//     console.log(myUser.passwordHash)
//
// })();

// read todo
// (async () => {
//     const todo = await ToDo.findOne(
//         {
//             attributes: {exclude: []},
//             where: {id: 1}
//         })
//     console.log('todo')
//     console.log(todo.checked)
//
// })();


// add user
// const user = User.create({
//     firstName: "michael",
//     secondName: "terentyev",
//     login: 'palich',
//     passwordHash: '81dc9bdb52d04dc20036dbd8313ed055',
//     bearerToken: 'someToken'
// });

// update user
// (async () => {
//     await User.update({firstName: 'erik'}, {
//         where: {
//             login: "erik"
//         }
//     });
// })();


// add to do
// const todo = ToDo.create({
//     title: "elephant ",
//     checked: false,
//     userId: 1
// });

// delete user
// (async () => {
//     await User.destroy({
//         where: {
//             firstName: "2"
//         }
//     });
// })();
