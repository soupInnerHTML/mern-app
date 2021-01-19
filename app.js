const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/todo', require('./routes/todo.routes.js'))
app.use('/api/bookmark', require('./routes/bookmark.routes.js'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
    })
}


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            // параметры для успешной работы connect
        })
        app.listen(PORT, () => console.log(`Started on port ${PORT}...`))
    }
    catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()