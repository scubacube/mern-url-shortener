const {Router} = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')

// /api/auth
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min password length is 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('Body: ', req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), message: 'Incorrect registration info'})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email: email})
        if(candidate) {
            return res.status(400).json({message: 'user is already registered'})
        }

        const hashedPassword = await bcryptjs.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'user is created'})
    } catch (e) {
        res.status(500).json({message: 'something went wong'})
    }
})

// /api/login
router.post(
    '/login',
    [
        check('email', 'Please enter an email').normalizeEmail().isEmail(),
        check('password', 'Please enter a password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: 'Incorrect sign in info'})
            }
            const {email, password} = req.body

            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: 'User is not found'})
            }

            const isMatch = await bcryptjs.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

            res.status(201).json({message: 'user is created'})
        } catch (e) {
            res.status(500).json({message: 'something went wong'})
        }
    })

module.exports = router