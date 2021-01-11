const { Router } = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.post('/addTodo', auth, async (req, res) => {
    try {
        // const baseUrl = config.get('baseUrl')
        const { body } = req
        await body.save()

        res.status(201).json({ message: body })
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const todos = await Link.find({ owner: req.user.userId })
        res.json(todos)
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const todos = await Link.findById(req.params.id)
        res.json(todos)
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
})

module.exports = router