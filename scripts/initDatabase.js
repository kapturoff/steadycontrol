const Database = require('better-sqlite3'),
    { join } = require('path'),
    { readFileSync } = require('fs')

console.log('Создается схема базы...')

// Подключаемся к базе

const db = new Database('db.sqlite3')

const sqlPath = join(__dirname, 'init.sql'),
    createDatabaseSchema = readFileSync(sqlPath, 'utf8')

db.exec(createDatabaseSchema)

console.log('Выполнено!')
