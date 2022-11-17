const { Database } = require('better-sqlite3'),
    UserGroup = require('./UserGroup'),
    Group = require('./Group')

class User {
    constructor(db, { name, city_id, groups }) {
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
        const query = db.prepare('SELECT id, name, city_id FROM users')

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
        const user = db
            .prepare('SELECT id, name, city_id FROM users where id = ?')
            .get(user_id)

        if (!user) return null

        return {
            ...user,
            groups: UserGroup.getGroups(db, user.id)
        }
    }
}

module.exports = User
