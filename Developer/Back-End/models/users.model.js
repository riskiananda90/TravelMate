const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            min: 17,
            max: 70
        },

        create_at: {
            type: Date,
            default: Date.now
        }

    }
)

const User = mongoose.model("User", userSchema)

module.exports = User