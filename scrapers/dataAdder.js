const cvLTScrapper = require('./cvLTScraper');
const {
    keywords,
    findKeywords,
    addToDatabase,
    findSalary,
    findTechnologies,
} = require('./ScrapperData');
const Job = require('../models/Job');
const Technology = require('../models/Technology');
const connectDB = require('../config/db');
const cvBankasScrapper = require('./cvBankasScraper');
connectDB();

cvBankasScrapper.startScrape().then((jobsObject) => {
    const jobsWithKeywords = findKeywords(jobsObject, keywords);
    const jobsWithSalary = findSalary(jobsWithKeywords);
    const Technologies = findTechnologies(
        jobsWithSalary,
        keywords,
        'CvBankas.lt'
    );
    console.log(Technologies);
    //Separate technologies for every keyword
    addToDatabase(Technology, Technologies).then((e) => {
        console.log('Finished technologies to db');
    });

    addToDatabase(Job, jobsWithSalary).then((e) => {
        console.log('Finished adding to DB (cvBankas.lt)');
    });
});
