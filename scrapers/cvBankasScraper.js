const puppeteer = require('puppeteer');

async function scrapeJobListing(url, page) {
    await page.goto(url);

    let jobTitleTextValue = '';
    let jobSalaryTextValue = '';
    let jobDescriptionTextValue = '';
    let CompanyTitleTextValue = '';
    let timePosted = '';
    try {
        const [jobTitle] = await page.$x(`//*[@id="jobad_heading1"]`);
        const jobTitleText = await jobTitle.getProperty('textContent');
        jobTitleTextValue = await jobTitleText.jsonValue(); // job title
        //console.log(`Title : ${jobTitleTextValue}`);
    } catch {
        //console.log("Title : notFound");
    }
    try {
        const [jobSalary] = await page.$x(
            `//*[@id="jobad_header"]/div[1]/span/span/span/span[1]/span[1]`
        );
        const jobSalaryText = await jobSalary.getProperty('textContent');
        jobSalaryTextValue = await jobSalaryText.jsonValue(); // job salary
        //console.log(`Salary : ${jobSalaryTextValue}`);
    } catch {
        //console.log("Salary : notFound");
    }
    try {
        const [jobDescription] = await page.$x(
            `//*[@id="jobad_content_main"]/section`
        );
        const jobDescriptionText = await jobDescription.getProperty(
            'textContent'
        );
        jobDescriptionTextValue = await jobDescriptionText.jsonValue(); // job description
        //console.log(`Description : ${jobDescriptionTextValue.replace(/\s/g, '')}`);
    } catch {
        //console.log("Description : not found");
    }
    try {
        const [CompanyTitle] = await page.$x(`//*[@id="jobad_company_title"]`);
        const CompanyTitleText = await CompanyTitle.getProperty('textContent');
        CompanyTitleTextValue = await CompanyTitleText.jsonValue(); // job description
        //console.log(`CompanyTitle : ${CompanyTitleTextValue}`);
    } catch {
        //console.log("CompanyTitle : not found");
    }
    try {
        timePosted = await page.$eval(
            `meta[itemprop="datePosted"]`,
            (element) => element.content
        );
        //console.log(`TimePOsted : ${timePosted.split(' ')[0]}`);
    } catch {
        //console.log("TimePOsted : not found");
    }
    /*try{ JOB LOCATION
        const [JobLocation] = await page.$x(`//*[@id="jobad_location"]/span/a/span`);
        const JobLocationText = await JobLocation.getProperty("textContent");
        const JobLocationTextValue = await JobLocationText.jsonValue(); // job description
        console.log(`Location : ${JobLocationTextValue}`);
    }
    catch{
        console.log("Location : not found");
    }*/
    return {
        job_title: jobTitleTextValue,
        text: jobDescriptionTextValue,
        company: CompanyTitleTextValue,
        job_posted_date: timePosted.split(' ')[0],
        salary: jobSalaryTextValue,
        website: 'CvBankas.lt',
    };
}

async function scrapeListingsUrls(entryUrl) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(entryUrl);

    const [jobBoard] = await page.$x('//*[@id="js_id_id_job_ad_list"]');
    const listings = await jobBoard.$$('article');
    let linkValues = [];
    for (const listing of listings) {
        let [atag] = await listing.$$('a');
        let link = await atag.getProperty('href');
        let linkValue = await link.jsonValue();
        linkValues = [...linkValues, linkValue];
    }

    browser.close();

    return linkValues;
}

async function scrapeGivenLinks(arrayOfLinks) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let ListingsObjectsArray = [];

    for (let i = 0; i < arrayOfLinks.length; i++) {
        ListingsObjectsArray.push(
            await scrapeJobListing(arrayOfLinks[i], page)
        );
    }

    //console.log(ListingsObjectsArray);
    await browser.close();
    return ListingsObjectsArray;
}

module.exports.startScrape = async function scrapeALLPAGES() {
    let mashedArray = [];
    for (let i = 1; i <= 7; i++) {
        let urls = await scrapeListingsUrls(
            `https://www.cvbankas.lt/?padalinys%5B0%5D=76&page=${i}`
        );
        let listings = await scrapeGivenLinks(urls);
        mashedArray = [...mashedArray, ...listings];
    }
    return mashedArray;
};
