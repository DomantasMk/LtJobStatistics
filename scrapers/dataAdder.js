const cvLTScrapper = require('./cvLTScraper');
const { keywords, findKeywords, addToDatabase } = require('./ScrapperData');
const Job = require('../models/Job');
const connectDB = require('../config/db');
connectDB();

cvLTScrapper
    .startScrape(
        'https://www.cv.lt/employee/announcementsAll.do?regular=true&department=1040&page=1'
    )
    .then((jobsObject) => {
        const jobsWithKeywords = findKeywords(jobsObject, keywords);
        addToDatabase(Job, jobsWithKeywords).then((e) => {
            console.log('Finished adding to DB');
        });
    });
