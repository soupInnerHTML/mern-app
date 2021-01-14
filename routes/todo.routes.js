const { Router } = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.post('/', auth, async (req, res) => {
    try {
        // const baseUrl = config.get('baseUrl')
        const { body } = req
        const todo = new Todo(body)

        await todo.save()


        res.status(201).json({ message: body })
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to add todo! Please try again' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos)
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const todos = await Todo.findById(req.params.id)
        res.json(todos)
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const {id} = req.params
        const todos = await Todo.findOneAndDelete({
            _id: id
        })

        res.json(todos)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to delete todo! Please, reload page and try again' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const {id, body} = req.params
        let todo = await Todo.findById(id)

        todo.update(body)

        res.json(todo)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to edit todo! Please, reload page and try again' })
    }
})

module.exports = router