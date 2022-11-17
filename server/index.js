const Koa = require('koa'),
    { server } = require('../package.json'),
    cors = require('@koa/cors')

const app = new Koa({}),
    router = require('./routes/router')

app.use(cors({ origin: '*' }))
app.use(router.routes())

app.listen(server.port, () => {
    console.log(`🚀 Сервер работает на порту ${server.port} 🚀`)
})
