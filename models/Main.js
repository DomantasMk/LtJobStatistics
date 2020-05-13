const mongoose = require('mongoose');

const MainSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    count: {
        type: Number,
    },
    average_salary: {
        type: Number,
    },
    date_added_to_db: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Main = mongoose.model('main', MainSchema);
