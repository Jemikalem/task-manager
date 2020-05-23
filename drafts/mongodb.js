// CRUD create read update delete

/* const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID */

const  { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
/* console.log(id.getTimestamp())
console.log(id.id)
console.log(id.id.length)
console.log(id.toHexString().length) */

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database !')
    }

    const db = client.db(databaseName)

/*    db.collection('users').insertOne({
        _id: id,    
        name: 'Kija',
        age: 26
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    }) */
/* 
    db.collection('users').insertMany([
        {
            name: 'Tutur',
            age: 28
        }, {
            name: 'Jone',
            age: 32
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: false
        }, {
            description: 'Pot plants',
            completed: true
        }, {
            description: 'Renew inspection',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
        console.log('Inserted count : ' + result.insertedCount)
    }) */


    /* db.collection('users').findOne({ name: 'Jone' }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(user)
    }) */

/* 
    // Using Cursor (cf: API)
    db.collection('users').find({ age: 28 }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: 28 }).count((error, count) => {
        console.log(count)
    })
 */

/*     db.collection('tasks').findOne({ _id: new ObjectID("5eb436c783d83b12cc03a38d") }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })
 */
/* 
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5eb431b74fc4802c74dd534b")
    }, {

        /* $set: {
            name: 'Mike'
        } *//*

        $inc: {
            age: -1
        }
    })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
 */
/* 
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
 */
/* 
    db.collection('users').deleteMany({
        age: 28
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
 */

    db.collection('tasks').deleteOne({ 
        description: "Clean the house" 
    }).catch((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})