const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    job_title: {
        type: String,
    },
    keywords: [
        {
            type: String,
        },
    ],
    job_posted_date: {
        type: String,
    },
    min_salary: {
        type: Number,
    },
    max_salary: {
        type: Number,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    date_added_to_db: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Job = mongoose.model('job', JobsSchema);
