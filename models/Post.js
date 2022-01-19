const mongoose = require('mongoose');

/**
 * Create Post model
 */

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    categories:{
        type: [String],
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes:{ 
        type: Number,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            message_body: {
                type: String,
                required: true
            },
            message_date: {
                type: Date,
                default: Date.now
            },
            message_user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ]
})


module.exports = mongoose.model('Post', PostSchema);