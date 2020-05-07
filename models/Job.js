const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
    },
    keywords: [
        {
            type: String,
        },
    ],
    jobPostedDate: {
        type: String,
    },
    Salary: {
        type: String,
    },
    Company: {
        type: String,
    },
    dateAddedToDb: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Job = mongoose.model('job', JobsSchema);
