const { Router } = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware')
// const config = require('config')
const router = Router()

router.post('/', auth, async (req, res) => {
    try {
        const { body } = req
        const todo = new Todo(body)

        await todo.save()

        res.status(201).json({ message: todo })
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
        const {params, body} = req
        let todo = await Todo.findOneAndUpdate({_id: params.id}, body)

        res.json(todo)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to edit todo! Please, reload page and try again' })
    }
})

module.exports = router