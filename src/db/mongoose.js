const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

/* 
const me = new User({
    name: '  Jeremy',
    email: 'JereMY@OUTLOOK.com',
    password: 'kkieLzp585e'
})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})
 */

/*  
const firstTask = new Task({
    description: 'Buy some paper for toilets'
})

firstTask.save().then(() => {
    console.log(firstTask)
}).catch((error) => {
    console.log(error)
}) */