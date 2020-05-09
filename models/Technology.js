const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    count: {
        type: Number,
    },
    average_salary: {
        type: Number,
    },
    website: {
        type: String,
    },
    date_added_to_db: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Technology = mongoose.model('technology', TechnologySchema);
