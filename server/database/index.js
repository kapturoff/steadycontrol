const Database = require('better-sqlite3')

// Модели

const User = require('./models/User')
const Group = require('./models/Group')
const UserGroup = require('./models/UserGroup')

// Подключаемся к базе

const db = new Database('db.sqlite3')

module.exports = {
    db,
    User,
    Group,
    UserGroup
}
