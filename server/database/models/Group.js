const { Database } = require('better-sqlite3')

class Group {
    /**
     * @param { Database } db
     * @param {{ name: string, type: number }} param1 Данные для поиска
     *
     * @returns Найденную группу или `null` если группы не существует
     */
    static findOne(db, { name, type }) {
        return db
            .prepare('select * from groups where name = @name and type = @type')
            .get({ name, type })
    }
    /**
     * Находит или создает новую группу
     *
     * @param { Database } db
     *
     * @returns Найденную группу
     */
    static findOrCreate(db, { name, type }) {
        const foundGroup = this.findOne(db, { name, type })

        if (!foundGroup) {
            const { lastInsertRowid: createdGroupId } = db
                .prepare(
                    'insert into groups (name, type) values (@name, @type)'
                )
                .run({ name, type })

            return this.findOne(db, { name, type })
        }

        return foundGroup
    }

    static getHumanReadableType(type) {
        switch (type) {
            case 0:
                return 'city'
            case 5:
                return 'district'
            case 10:
                return 'street'
            default:
                return 'unknown'
        }
    }
}

module.exports = Group
