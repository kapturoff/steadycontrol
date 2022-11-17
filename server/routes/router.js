const Router = require('@koa/router'),
    treeRouter = require('./tree'),
    usersRouter = require('./users')

const router = new Router()

router.use('/tree', treeRouter.routes())
router.use('/users', usersRouter.routes())

module.exports = router
