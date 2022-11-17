const Group = require('./Group'),
    { Database } = require('better-sqlite3')

const GET_GROUPS_SQL_QUERY = `
SELECT g.* from users_groups ug
LEFT JOIN groups g on g.id = ug.group_id
WHERE ug.user_id = ?
ORDER BY g.type
`

class UserGroup {
    constructor(user_id, group_id) {
        Object.assign(this, { user_id, group_id })
    }

    /**
     * Сохраняет связь между пользователем и группой в базе
     *
     * @param { Database } db
     */
    save(db) {
        const { lastInsertRowid } = db
            .prepare(
                'insert into users_groups (user_id, group_id) values (@user_id, @group_id)'
            )
            .run(this)

        return lastInsertRowid
    }

    /**
     * Находит все связанные с пользователем группы, отсортированные
     * по иерархии
     *
     * @param { Database } db
     * @param { number } user_id
     *
     * @returns Все группы, в которых состоит пользователь (город, район, улица и т.д...)
     */
    static getGroups(db, user_id) {
        const query = db.prepare(GET_GROUPS_SQL_QUERY).all(user_id)

        return query.map((group) => ({
            ...group,
            type: Group.getHumanReadableType(group.type)
        }))
    }
}

module.exports = UserGroup
