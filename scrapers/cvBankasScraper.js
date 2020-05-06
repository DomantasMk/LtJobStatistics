const puppeteer = require('puppeteer');

async function scrapeJobs(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [jobBoard] = await page.$x('//*[@id="js_id_id_job_ad_list"]');
    const listings = await jobBoard.$$('article');
    for(const listing of listings)
    {
        let [h3] = await listing.$$(".list_h3");
        let textObj = await h3.getProperty("textContent");
        let text = await textObj.jsonValue();

        console.log(text);
    }

    //console.log(listings);

    browser.close();
}
for(let i = 1; i < 66; i++){
    scrapeJobs(`https://www.cvbankas.lt/?page=${i}`);
}
