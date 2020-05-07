const puppeteer = require('puppeteer');

async function scrapeJobListing(url, page){

    await page.goto(url);

    try{
        const [jobTitle] = await page.$x(`//*[@id="jobad_heading1"]`);
        const jobTitleText = await jobTitle.getProperty("textContent");
        const jobTitleTextValue = await jobTitleText.jsonValue(); // job title
        console.log(`Title : ${jobTitleTextValue}`);
    }
    catch{
        console.log("Title : notFound");
    }
    try{
        const [jobSalary] = await page.$x(`//*[@id="jobad_header"]/div[1]/span/span/span/span[1]/span[1]`);
        const jobSalaryText = await jobSalary.getProperty("textContent");
        const jobSalaryTextValue = await jobSalaryText.jsonValue(); // job salary
        console.log(`Salary : ${jobSalaryTextValue}`); 
    }
    catch{
        console.log("Salary : notFound");
    }
    try{
        const [jobDescription] = await page.$x(`//*[@id="jobad_content_main"]/section`);
        const jobDescriptionText = await jobDescription.getProperty("textContent");
        const jobDescriptionTextValue = await jobDescriptionText.jsonValue(); // job description
        console.log(`Description : ${jobDescriptionTextValue.replace(/\s/g, '')}`);
    }
    catch{
        console.log("Description : not found");
    }
    try{
        const [CompanyTitle] = await page.$x(`//*[@id="jobad_company_title"]`);
        const CompanyTitleText = await CompanyTitle.getProperty("textContent");
        const CompanyTitleTextValue = await CompanyTitleText.jsonValue(); // job description
        console.log(`CompanyTitle : ${CompanyTitleTextValue}`);
    }
    catch{
        console.log("CompanyTitle : not found");
    }
    try{
        const [JobLocation] = await page.$x(`//*[@id="jobad_location"]/span/a/span`);
        const JobLocationText = await JobLocation.getProperty("textContent");
        const JobLocationTextValue = await JobLocationText.jsonValue(); // job description
        console.log(`Location : ${JobLocationTextValue}`);
    }
    catch{
        console.log("Location : not found");
    }
    try{
        const timePosted = await page.$eval(`meta[itemprop="datePosted"]`, element => element.content);
        console.log(`TimePOsted : ${timePosted.split(' ')[0]}`);
    }
    catch{
        console.log("TimePOsted : not found");
    }
}

async function scrapeListingsUrls(entryUrl){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(entryUrl);

    const [jobBoard] = await page.$x('//*[@id="js_id_id_job_ad_list"]');
    const listings = await jobBoard.$$('article');
    let linkValues = [];
    for(const listing of listings)
    {
        let [atag] = await listing.$$('a');
        let link = await atag.getProperty('href');
        let linkValue = await link.jsonValue();
        linkValues = [...linkValues, linkValue];
    }

    browser.close();

    return linkValues;
}

async function scrapeGivenLinks(arrayOfLinks){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(let i = 0; i < arrayOfLinks.length ;i++){
        await scrapeJobListing(arrayOfLinks[i], page);
        console.log("------------");
    }


    await browser.close();
}

async function scrapeALLPAGES(){
    for(let i = 1; i <=1; i++){
        await scrapeListingsUrls(`https://www.cvbankas.lt/?padalinys%5B0%5D=76&page=${i}`)
        .then(
            linkArray =>{scrapeGivenLinks(linkArray);}
        ).catch(
            (err) =>{console.log(err)}
        );
    }
}
scrapeALLPAGES();



