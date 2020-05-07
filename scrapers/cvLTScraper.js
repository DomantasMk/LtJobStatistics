const puppeteer = require('puppeteer');

async function scrapeInside(page) {
    const scrappedInfo = await page.evaluate(() => {
        const title = document.querySelector('#jobCont01 > h1').innerHTML;
        const text = document.querySelector('#jobTxtRight').innerText;
        return {
            title,
            text,
        };
    });

    return scrappedInfo;
}

async function scrapeOutside(page) {
    const jobUrls = await page.evaluate(() => {
        let urls = [];
        let itemsWithUrls = document.querySelectorAll('a[itemprop="title"]');
        for (let i = 0; i < itemsWithUrls.length; i++) {
            urls.push(itemsWithUrls[i].href);
        }

        return urls;
    });

    return jobUrls;
}

async function getPagesUrls(page) {
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

    //Get inside urls
    console.log(fullUrls);
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
