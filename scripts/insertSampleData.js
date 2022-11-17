const { Database } = require('better-sqlite3'),
    citizens = require('./citizens.json'),
    cities = require('./cities.json'),
    { db } = require('../server/database')

const GROUP_TYPES = {
    city: 0,
    district: 5,
    street: 10,
    unknown: 999
}

const CITY_NAMES = {
    'Москва г.': 'Москва',
    'Санкт-Петербург г.': 'Санкт-Петербург',
    'Воронеж г.': 'Воронеж'
}

/**
 * Добавляет в базу данные, полученные с тестовым заданием
 *
 * @param { Database } db
 */
function insertSampleData(db) {
    // Добавляет города

    for (const city of cities) {
        db.prepare(
            'insert into cities (name, citizens_amount) values (@name, @citizens_amount)'
        ).run({
            name: city.name,
            citizens_amount: Number(city.data)
        })
    }

    // Добавляет пользователей

    for (const sampleUser of citizens) {
        /**
         * Создаем пользователя.
         *
         * В тестовых данных у всех пользователей проставлены ID,
         * которые, почему-то, не уникальные. Не уникальные ID - проблема для
         * дальнейших запросов в базу, так что было принято решение убрать
         * ID пользователя из тестовых данных и дать сгенерировать ID
         * базе.
         */

        const { id, ...user } = sampleUser

        const { lastInsertRowid: user_id } = db
            .prepare(
                'insert into users (name, city_id) values (@name, @city_id)'
            )
            .run(user)

        for (const group of user.groups) {
            // Ищем в кэше группу или создаем в базе новую, если группа не найдена

            let foundGroup = db
                .prepare(
                    'select id, type, name from groups where type = @type AND name = @name'
                )
                .get(group)

            if (!foundGroup) {
                const type = GROUP_TYPES[group.type],
                    newGroup = { ...group, type }

                db.prepare(
                    'insert into groups (type, name) values (@type, @name)'
                ).run(newGroup)

                // Делаем еще один запрос к базе, т.к. нужно получить ID созданной группы

                foundGroup = db
                    .prepare(
                        'select id, type, name from groups where type = @type AND name = @name'
                    )
                    .get(newGroup)
            }

            // Создаем связи между группами и пользователями.

            db.prepare(
                'insert into users_groups values (@user_id, @group_id)'
            ).run({
                user_id,
                group_id: foundGroup.id
            })

            /**
             * В тестовых данных спутаны city_id у пользователей, поэтому придется
             * брать названия городов из группы и привязывать их к пользователям
             * самостоятельно
             */

            if (foundGroup.type === 0) {
                const cityName = CITY_NAMES[foundGroup.name],
                    cityId = db
                        .prepare('select id from cities where name = ?')
                        .get(cityName)?.id

                db.prepare(
                    'update users set city_id = @city_id where id = @user_id'
                ).run({ city_id: cityId, user_id })
            }
        }
    }
}

console.log('Добавляются тестовые данные в базу...')

insertSampleData(db)

console.log('Выполнено!')
