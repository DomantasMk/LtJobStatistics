const cvLTScrapper = require('./cvLTScraper');
const { keywords, findKeywords, addToDatabase } = require('./ScrapperData');
const Job = require('../models/Job');
const connectDB = require('../config/db');
const cvBankasScrapper = require('./cvBankasScraper');
connectDB();

cvBankasScrapper
    .startScrape(
        
    )
    .then((jobsObject) => {
        console.log(jobsObject);
        const jobsWithKeywords = findKeywords(jobsObject, keywords);
        addToDatabase(Job, jobsWithKeywords).then((e) => {
            console.log('Finished adding to DB (cv.lt)');
        });
    });
