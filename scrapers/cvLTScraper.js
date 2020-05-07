const puppeteer = require('puppeteer');

async function scrapeInside(page) {
    const scrappedInfo = await page.evaluate(() => {
        let title = null;
        let text = null;
        let company = null;
        let datePosted = null;
        let baseSalary = null;

        try {
            title = document.querySelector('#jobCont01 > h1').innerHTML;
        } catch (error) {
            console.log(error);
        }

        try {
            text = document.querySelector('#jobTxtRight').innerText;
        } catch (error) {
            console.log(error);
        }

        try {
            company = document.querySelector(
                "meta[itemprop='hiringOrganization']"
            ).content;
        } catch (error) {
            console.log(error);
        }

        try {
            datePosted = document.querySelector("meta[itemprop='datePosted']")
                .content;
        } catch (error) {
            console.log(error);
        }

        try {
            baseSalary = document.querySelector("meta[itemprop='baseSalary']")
                .content;
        } catch (error) {
            console.log(error);
        }

        return {
            title,
            text,
            company,
            datePosted,
            baseSalary,
        };
    });

    return scrappedInfo;
}

async function scrapeOutside(page) {
    try {
        const jobUrls = await page.evaluate(() => {
            let urls = [];
            let itemsWithUrls = document.querySelectorAll(
                'a[itemprop="title"]'
            );
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
            let items = document
                .querySelector('.paging-list')
                .querySelector('.has-sub')
                .querySelector('ul')
                .getElementsByTagName('a');
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

async function startScrape(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    let fullUrls = [];
    let fullScraped = [];

    //Get pages links
    const pagesUrls = await getPagesUrls(page);

    //Loop thru each page and get cv urls
    for (let i = 0; i < pagesUrls.length; i++) {
        await page.goto(pagesUrls[i], { waitUntil: 'networkidle2' });
        const urls = await scrapeOutside(page);
        fullUrls = fullUrls.concat(urls);
    }

    for (let i = 0; i < fullUrls.length; i++) {
        await page.goto(fullUrls[i], { waitUntil: 'networkidle2' });
        let info = await scrapeInside(page);
        fullScraped.push(info);
    }

    console.log(fullScraped);
    debugger;
    await browser.close();
}

startScrape(
    'https://www.cv.lt/employee/announcementsAll.do?regular=true&department=1040&page=1'
);
