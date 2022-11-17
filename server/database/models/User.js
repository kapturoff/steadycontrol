const { Database } = require('better-sqlite3'),
    UserGroup = require('./UserGroup'),
    Group = require('./Group')

const SELECT_USER_BY_ID_SQL = `
SELECT 
    u.id as id,
    u.name as name,
    c.id as city_id,
    c.name as city_name,
    c.citizens_amount as city_citizens_amount
FROM users u
LEFT JOIN cities c on c.id = u.city_id
WHERE u.id = ?
`

const SELECT_ALL_USERS_SQL = `
SELECT 
    u.id as id,
    u.name as name,
    c.id as city_id,
    c.name as city_name,
    c.citizens_amount as city_citizens_amount
FROM users u
LEFT JOIN cities c on c.id = u.city_id
`


class User {
    constructor({ name, city_id, groups }) {
        Object.assign(this, { name, city_id, groups })
    }

    /**
     * Сохраняет пользователя в базе, подставляя существующие
     * вложенные в пользователя группы или создавая новые
     *
     * @param { Database } db
     */
    save(db) {
        const { lastInsertRowid: user_id } = db
            .prepare(
                'insert into users (name, city_id) values (@name, @city_id)'
            )
            .run(this)

        for (const group of this.groups) {
            const foundGroup = Group.findOrCreate(db, {
                name: group.name,
                type: group.type
            })

            const userGroup = new UserGroup(user_id, foundGroup.id)
            userGroup.save(db)
        }

        return user_id
    }

    /**
     * Возвращает список всех пользователей вместе с их группами,
     * отсортированными по иерархии
     *
     * @param { Database } db
     * @returns { User[] } Список пользователей
     */
    static findAll(db) {
        const query = db.prepare(SELECT_ALL_USERS_SQL)

        const users = query.all().map((user) => ({
            ...user,
            groups: UserGroup.getGroups(db, user.id)
        }))

        return users
    }

    /**
     * Возвращает одного найденного пользователя вместе с tuj группами,
     * отсортированными по иерархии
     *
     * @param { Database } db
     * @returns { User } Найденного пользователя
     */
    static findOne(db, user_id) {
        const user = db.prepare(SELECT_USER_BY_ID_SQL).get(user_id)

        if (!user) return null

        return {
            ...user,
            groups: UserGroup.getGroups(db, user.id)
        }
    }
}

module.exports = User
