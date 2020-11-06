const cvLTScrapper = require("./cvLTScraper");
const cvOnlineScrapper = require("./CVonline_scraper");
const {
  keywords,
  findKeywords,
  addToDatabase,
  findSalary,
  findTechnologies,
} = require("./ScrapperData");
const Job = require("../models/Job");
const Technology = require("../models/Technology");
const connectDB = require("../config/db");
const cvBankasScrapper = require("./cvBankasScraper");
connectDB();

// cvBankasScrapper.startScrape().then((jobsObject) => {
//   const jobsWithKeywords = findKeywords(jobsObject, keywords);
//   const jobsWithSalary = findSalary(jobsWithKeywords);
//   const Technologies = findTechnologies(
//     jobsWithSalary,
//     keywords,
//     "CvBankas.lt"
//   );
//   //Separate technologies for every keyword
//   addToDatabase(Technology, Technologies).then((e) => {
//     console.log("Finished technologies to db");
//   });

//   addToDatabase(Job, jobsWithSalary).then((e) => {
//     console.log("Finished adding to DB (cvBankas.lt)");
//   });
// });

cvLTScrapper
  .startScrape("https://www.cv.lt/it-telekomunikaciju-darbai")
  .then((jobsObject) => {
    const jobsWithKeywords = findKeywords(jobsObject, keywords);
    const jobsWithSalary = findSalary(jobsWithKeywords);
    const Technologies = findTechnologies(jobsWithSalary, keywords, "cv.lt");

    //Separate technologies for every keyword
    addToDatabase(Technology, Technologies).then((e) => {
      console.log("Finished technologies to db (cv.lt)");
    });

    addToDatabase(Job, jobsWithSalary).then((e) => {
      console.log("Finished adding to DB (cv.lt)");
    });
  });
