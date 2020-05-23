const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Express Middleware
// for maintenance mode activated!
/* app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon!')
})
 */
/* app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET requests are disabled')
    } else {
        next()
    }
}) */


//We setup this line below : it's going to automatically pass incoming Json to an object 
// so we can access it in our request handlers
app.use(express.json())

//Router
app.use(userRouter)
app.use(taskRouter)

//
// Without middleware:  new request -> run route handler
//
// With middleware:     new request -> do something -> run route handler
//


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/* const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
//    const task = await Task.findById('5ec6dfde7c10ea5ec895f79e')
//    await task.populate('owner').execPopulate()
//    console.log(task.owner)

    const user = await User.findById('5ec6dfbf7c10ea5ec895f79b')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
 */
/* const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction() */


/* 
const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12374!'
    const hashedPassword = await bcrypt.hash(password, 8)
    // note about the salt : if we use too few rounds the algorithm is a bit easier to crack
    // if we use too many rounds it takes so long to run that our application becomes useless.
    // Eight seems to strike a nice bounce between the two, and this was the value recommended by the original
    // creator of the algorithm.

    console.log(password)
    console.log(hashedPassword)
    // jeremy -> orirjgorlgjtuthdproidkrpr -> jeremy
    // mypass -> mrogjuthdnosjf,fitiithtnt

    const isMatch = await bcrypt.compare('red12374!', hashedPassword)
    console.log(isMatch)
}

myFunction()
 */