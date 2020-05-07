const puppeteer = require('puppeteer');

async function scrapeInside(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    console.log(await getTittle(page));

    const [jobDescriptionContainer] = await page.$x('//*[@id="jobTxtRight"]');
    const span = await jobDescriptionContainer.$$('ul');
    console.log(text);

    browser.close();
}

async function getTittle(page) {
    const [tittleContainer] = await page.$x('//*[@id="jobCont01"]');
    let title = await (
        await (await tittleContainer.$('h1')).getProperty('textContent')
    ).jsonValue();

    return title;
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

    await browser.close();
}

startScrape(
    'https://www.cv.lt/employee/announcementsAll.do?regular=true&department=1040&page=1'
);
