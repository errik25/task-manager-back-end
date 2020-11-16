const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/users.db",
});

class User extends Model {}
class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TEXT,
    },
    creator: {
      type: DataTypes.TEXT,
    },
    responsible: {
      type: DataTypes.TEXT,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
    },
    completionDate: {
      field: "completion_date",
      type: Sequelize.DATE,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Task", // We need to choose the model name
  }
);
User.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.TEXT,
    },
    surname: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    bearerToken: {
      field: "bearer_token",
      type: DataTypes.TEXT,
    },
    passwordHash: {
      field: "password_hash",
      type: DataTypes.TEXT,
      allowNull: false,
    },
    login: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
    middleName: {
      field: "middle_name",
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manager: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

module.exports = { User, Task };
