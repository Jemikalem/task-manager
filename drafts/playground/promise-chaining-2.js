require('../../src/db/mongoose')
const Task = require('../../src/models/task')

Task.findByIdAndDelete('5ebd81051ef4953ff499fe64').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})