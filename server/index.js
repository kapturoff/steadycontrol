const Koa = require('koa'),
    { server } = require('../package.json')

const app = new Koa({}),
    router = require('./routes/router')

app.use(router.routes())

app.listen(server.port, () => {
    console.log(`🚀 Сервер работает на порту ${server.port} 🚀`)
})
