/**
 * Created by Jackson on 10/5/16.
 */
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    uuid: String,
    title: String,
    content: String,
    priority: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);