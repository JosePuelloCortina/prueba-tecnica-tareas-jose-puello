const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();

const {
    DB_NAME, DB_USER, DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
    `${DB_NAME}`,
    `${DB_USER}`,
    `${DB_PASSWORD}`, {
        host: 'localhost',
        dialect: 'mysql'
    }
);
const defineTask = require('./models/Task');
const defineUser = require('./models/User');

defineTask(sequelize);
defineUser(sequelize);

const { Task, User } = sequelize.models; 

User.hasMany(Task);
Task.belongsTo(User); 
module.exports = {
    Task,
    User,
    conn: sequelize,
}; 