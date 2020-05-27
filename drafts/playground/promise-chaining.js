require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

/* User.findByIdAndUpdate('5ebc050d223ee15290246f87', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
}) */

/* const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count 
}

updateAgeAndCount('5ebc050d223ee15290246f87', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
 */

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false }) // NB: if countDocuments() should'nt return a Promise, we could not use it with await
    return count 
}

deleteTaskAndCount('5ec0220446b6e14f6cf9633a').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})