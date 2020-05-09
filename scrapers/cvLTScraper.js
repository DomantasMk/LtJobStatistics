const puppeteer = require('puppeteer');

async function scrapeInside(page) {
    const scrappedInfo = await page.evaluate(() => {
        let job_title = null;
        let text = null;
        let company = null;
        let job_posted_date = null;
        let salary = null;
        let website = 'cv.lt';

        try {
            job_title = document.querySelector('#jobCont01 > h1').innerHTML;
        } catch (error) {
            console.log(error.message);
        }

        try {
            text = document.querySelector('#jobTxtRight').innerText;
        } catch (error) {
            console.log(error.message);
        }

        try {
            company = document.querySelector(
                "meta[itemprop='hiringOrganization']"
            ).content;
        } catch (error) {
            console.log(error.message);
        }

        try {
            job_posted_date = document.querySelector(
                "meta[itemprop='datePosted']"
            ).content;
        } catch (error) {
            console.log(error.message);
        }

        try {
            salary = document.querySelector("meta[itemprop='baseSalary']")
                .content;
        } catch (error) {
            console.log(error.message);
        }

        return {
            job_title,
            text,
            company,
            job_posted_date,
            salary,
            website,
        };
    });

    console.log('Inner scrapped...');
    return scrappedInfo;
}

async function scrapeOutside(page) {
    try {
        const jobUrls = await page.evaluate(() => {
            let urls = [];

            try {
                let itemsWithUrls = document.querySelectorAll(
                    'a[itemprop="title"]'
                );
            } catch (error) {
                console.log(error.message);
                console.log('Scrape outside failed to find elements');
            }

            for (let i = 0; i < itemsWithUrls.length; i++) {
                urls.push(itemsWithUrls[i].href);
            }

            return urls;
        });

        return jobUrls;
    } catch (error) {
        console.log(error);
    }
}

async function getPagesUrls(page) {
    try {
        const urls = await page.evaluate(() => {
            let urls = [];

            try {
                let items = document
                    .querySelector('.paging-list')
                    .querySelector('.has-sub')
                    .querySelector('ul')
                    .getElementsByTagName('a');
            } catch (error) {
                console.log(error.message);
                console.log('failed to find pages URLS ');
            }

            for (let i = 0; i < items.length; i++) {
                urls.push(items[i].href);
            }

            return urls;
        });

        return urls;
    } catch (error) {
        console.log(error);
    }
}

module.exports.startScrape = async function (url) {
    console.log('Started scraping');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    let fullUrls = [];
    let fullScraped = [];

    //Get pages links
    console.log('Getting pages URLS');
    const pagesUrls = await getPagesUrls(page);

    //Loop thru each page and get cv urls
    console.log('Getting all job urls');
    for (let i = 0; i < pagesUrls.length; i++) {
        await page.goto(pagesUrls[i], { waitUntil: 'networkidle2' });
        const urls = await scrapeOutside(page);
        fullUrls = fullUrls.concat(urls);
    }

    console.log('Scrapping job insides');
    for (let i = 0; i < fullUrls.length; i++) {
        await page.goto(fullUrls[i], { waitUntil: 'networkidle2' });
        let info = await scrapeInside(page);
        fullScraped.push(info);
    }
    console.log('Finished scraping');

    await browser.close();
    return fullScraped;
};
