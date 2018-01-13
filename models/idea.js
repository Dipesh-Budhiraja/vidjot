const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//idea schema
const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: Date.now
    },
});

mongoose.model('ideas', IdeaSchema);