const Koa = require('koa'),
    { server } = require('../package.json'),
    cors = require('@koa/cors'),
    serve = require('koa-static'),
    { join } = require('path')

const app = new Koa({}),
    router = require('./routes/router'),
    staticPath = join(__dirname, 'static')

app.use(serve(staticPath))
app.use(cors({ origin: '*' }))
app.use(router.routes())

app.listen(server.port, () => {
    console.log(`🚀 Сервер работает на порту ${server.port} 🚀`)
})
