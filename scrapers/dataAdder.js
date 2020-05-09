const cvLTScrapper = require('./cvLTScraper');
const {
    keywords,
    findKeywords,
    addToDatabase,
    findSalary,
} = require('./ScrapperData');
const Job = require('../models/Job');
const Technology = require('../models/Technology');
const connectDB = require('../config/db');
const cvBankasScrapper = require('./cvBankasScraper');
connectDB();

cvBankasScrapper.startScrape().then((jobsObject) => {
    const jobsWithKeywords = findKeywords(jobsObject, keywords);
    const jobsWithSalaray = findSalary(jobsWithKeywords);
    //Seperate keywords to different types
    addToDatabase(Job, jobsWithSalaray).then((e) => {
        console.log('Finished adding to DB (cvBankas.lt)');
    });
});
