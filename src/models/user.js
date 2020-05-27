const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Passaword cannot contain "password"')
            }
        }
        //ToDo: learn how to add the HASH password and more security
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// We do create a tokens array to store those tokens. Wa are not going to do the same thing for tasks. 
// The tasks live in a separate collection. Instead what we are going to do is set up what's known as a virtual
// property. A virtual property is not actual data stored in the database. It' a relationship between two entities.
// In this case between our user and our task to start off we'll be using something on user schema.
// It is called the virtual and it allows us to set up one of these virtual attributes. Now it's virtual because
// we are not actually changing what we store for the user document it is just a way for mongoose to figure out how
// these two things are related.
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// In order to avoid to expose privates data, we write a method that return only public data of the user.
// the '.toJSON' is an equivalent of the 'JSON.stringify(object)' that is running in back scene. 
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.token

    return userObject
}

// userSchema.methods is for methods on the instance and individual user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// userSchema.staticsis for methods on the actual uppercase U user model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// This needs to be a standard function no an arrow function because is this binding plays an important
// role and aw we know arrow functions don't bind this.
// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// (Another middleware) Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

// Now when I do that we have access to the user schema and all we're going to do is pass 'userSchema'
// in the mongoose.model as the second argument to model.
// So if we were to pass an object in Mongoose was doing that behind the scenes anyways in this case we
// are creating a separate schema and a separate model.
// And this is going to allow us to take advantage of middleware.
const User = mongoose.model('User', userSchema)


module.exports = User