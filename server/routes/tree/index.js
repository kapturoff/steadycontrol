const { User, db } = require('../../database'),
    Router = require('@koa/router'),
    convertUsersToTree = require('./convertUsersToTree')

const router = new Router()

router.get('/', (ctx) => {
    const users = User.findAll(db)

    ctx.body = convertUsersToTree(users)
})

module.exports = router
