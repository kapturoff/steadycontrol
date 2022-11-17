const Router = require('@koa/router'),
    { User, db } = require('../../database')

const router = new Router()

router.get('/:id', (ctx) => {
    const user = User.findOne(db, ctx.params.id)
    if (!user) return ctx.throw(404, `User's not found`)

    ctx.body = user
})

module.exports = router
