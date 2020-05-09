const cvLTScrapper = require('./cvLTScraper');
const { keywords, findKeywords, addToDatabase } = require('./ScrapperData');
const Job = require('../models/Job');
const Technology = require('../models/Technology');
const connectDB = require('../config/db');
const cvBankasScrapper = require('./cvBankasScraper');
connectDB();

cvBankasScrapper.startScrape().then((jobsObject) => {
    const jobsWithKeywords = findKeywords(jobsObject, keywords);

    //Seperate keywords to different types
    addToDatabase(Job, jobsWithKeywords).then((e) => {
        console.log('Finished adding to DB (cvBankas.lt)');
    });
});
