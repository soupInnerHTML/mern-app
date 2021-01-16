const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
const User = require('../models/User')

const MIN_PASS_LEN = 6
const errorJson = (res, message, errors) => res.status(400).json({ message, errors })

// /api/auth/rigister
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', `Минимальная длина пароля ${MIN_PASS_LEN}`)
            .isLength({ min: MIN_PASS_LEN })
    ],
    async (req, res) => {

        try {
            console.log(req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return errorJson(res, 'Некорректные данные при регистрации', errors.array())
            }



            const { email, password, repeatPassword, avatar } = req.body
            const candidate = await User.findOne({ email }) //Поиск email по бд

            if (candidate) {
                return errorJson(res, 'Такой пользователь уже существует')
            }
            else if (password !== repeatPassword) {
                return errorJson(res, 'Пароли не совпадают')
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 12) // пароль и сложность
                const user = new User({ email, avatar, password: hashedPassword })

                await user.save()

                res.status(201).json({ message: 'Пользователь создан' })
            }
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return errorJson(res, 'Некорректные данные', errors.array())
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })
            console.log(email)

            if (!user) {
                return errorJson(res, 'Пользователь не найден')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return errorJson(res, 'Неверный пароль, попробуйте снова')
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, email: user.email, avatar: user.avatar })

        }
        catch (e) {
            res.status(500).json({ 'message': 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

module.exports = router