const express = require('express')
const app = express()
const mongoose = require('mongoose');
const uri = 'mongodb+srv://shohrux:2qgLSOze8Q4kGtDM@cluster0.iczbdik.mongodb.net/online-edu'
const { create } = require('express-handlebars')
const User = require('./model/user');

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'HBS'
    })
})

app.get('/user', async (req, res) => {
    const users = await User.find()
    res.render('users', {
        users
    })
})

app.post('/add', async (req, res) => {
    const { name, year } = req.body
    const user = new User({
        name, year
    })

    await user.save()
    res.redirect('/')
})

app.get('/user/delete/:id/', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/user')
})

// edit

async function db() {
    await mongoose.connect(uri, () => {
        console.log('mongodb conected')
    });
}
db()

const port = 3000
app.listen(port, () => {
    console.log('working port ' + port)
})