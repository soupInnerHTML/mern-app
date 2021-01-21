const { Router } = require('express')
const Bookmark = require('../models/Bookmark')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ owner: req.user.userId })
        res.json(bookmarks)
    }
    catch (e) {
        res.status(500).json({ message: "Something wrong..." })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const { body } = req

        const bookmark = new Bookmark(body)

        await bookmark.save()

        res.json(bookmark)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to add bookmark! Please try again' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const {id} = req.params
        const bookmark = await Bookmark.findOneAndDelete({
            _id: id
        })

        res.json(bookmark._id)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to delete bookmark! Please, reload page and try again' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const {params, body} = req
        await Bookmark.findOneAndUpdate({_id: params.id}, body)

        res.json(body)
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to edit bookmark! Please, reload page and try again' })
    }
})

module.exports = router