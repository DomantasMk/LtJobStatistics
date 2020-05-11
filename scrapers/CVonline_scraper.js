const puppeteer = require('puppeteer');
const website = 'https://www.cvonline.lt';
const url = (cvonline) => `https://www.cvonline.lt/darbo-skelbimai/${cvonline}`; // link, kuriame vyksta scrapinimas
const self = {
    browser: null,
    page: null, // visiem linkam gauti
    pageDeep: null, // viekvieno darbo apraso puslapis
    pageDDeep: null, // dar giliau ;)
    initialize: async (cvonline) => {
        // atidaryti pagrindini puslapi
        console.log('Pradedama programa...');
        self.browser = await puppeteer.launch();
        self.page = await self.browser.newPage();
        await self.page.goto(url(cvonline), { waitUntil: 'networkidle2' });
    },
    getResults: async (nr) => {
        // gaunamas nurodytas kiekis
        console.log('Pradedami imti duomenys...');
        let results = []; // pagrindinis duomenu saugojimo masyvas
        do {
            let new_results = await self.parseResults(); // gauname naujus duomenis kviesdami parseResults()
            results = results.concat(new_results); // sujungiame sena su nauju masyvu (idedame duomenis i pagrindini masyva)
            if (results.length < nr) {
                // jungiame nauja puslapi, jeigu nera gautas norimas duomenu kiekis
                let nextPageButton = null;
                try {
                    nextPageButton = await self.page.$eval(
                        '#page-pagination > ul > li[class="page_next"] > a',
                        (node) => node.getAttribute('href')
                    ); // gaunamas mygtuko href
                    nextPageButton = website.concat(nextPageButton); // sukuriame mygtuko gauta link
                } catch (e) {
                    console.log('Nebėra daugiau puslapių');
                }
                console.log(nextPageButton);
                if (nextPageButton) {
                    // jeigu yra mygtukas i sekanti puslapi, jungiame
                    self.page = await self.browser.newPage();
                    await self.page.goto(nextPageButton);
                } else {
                    // jeigu nera mygtuko, sustabdomas ciklas
                    break;
                }
            }
        } while (results.length < nr); // ciklas leidziamas tol, kol ispildomas norimas duomenu kiekis
        return results.slice(0, nr); // grazinami visi duomenys
    },
    parseResults: async () => {
        let i = 1; // nuskaityto skelbimo indikatorius (debuginimo reiksmems)
        let elements = await self.page.$$(
            '#joblist > div > div > div > div > div > div > div'
        ); // taisykle, pagal kuria randami visi elementu objectai
        let results = []; // nuskaitytiems duomenims sudeti masyvas
        for (let element of elements) {
            let link = await element.$eval('h2 > a[itemprop="title"]', (node) =>
                node.getAttribute('href')
            ); // issaugojamas href
            link = 'https:'.concat(link); // sukuriamas link i puslapi
            if (!link.includes('youtube')) {
                let job_title = 'NoTitle'; // reiksmes, jeigu nebutu randami objektai
                let salary = 'NoSalary';
                let adress = 'NoAdress';
                let company = 'NoCompany';
                try {
                    // randamas ir issaugojamas skelbimo pavadinimas
                    job_title = await element.$eval(
                        'h2 > a[itemprop="title"]',
                        (node) => node.innerText.trim()
                    );
                } catch (e) {
                    console.log(e + '(FATAL ERROR)');
                }
                try {
                    // randamas ir issaugojamas skelbimo atlyginimas
                    salary = await element.$eval(
                        'div > ul > li > span[class="salary-blue"]',
                        (node) => node.innerText.trim()
                    );
                    salary = salary.substr(27);
                } catch (e) {
                    console.log('Nėra atlyginimo >> ' + job_title);
                }
                try {
                    // randamas ir issaugojamas skelbimo adresas
                    adress = await element.$eval(
                        'span[itemprop="jobLocation"] > a',
                        (node) => node.innerText.trim()
                    );
                } catch (e) {
                    console.log('Nėra adreso >> ' + job_title);
                }
                try {
                    // randamas ir issaugojamas skelbimo kompanija
                    company = await element.$eval(
                        'span[itemprop="hiringOrganization"] > a',
                        (node) => node.innerText.trim()
                    );
                } catch (e) {
                    console.log('Nėra kompanijos >> ' + job_title);
                }
                self.pageDeep = await self.browser.newPage(); // atidaromas naujas nagrinejamo skelbimo puslapis
                await self.pageDeep.goto(link, { waitUntil: 'networkidle2' });
                let job_posted_date = 'NoDate';
                let dateTo = 'NoDate';
                try {
                    // randamos ir issaugojamos skelbimo datos
                    job_posted_date = await self.pageDeep.$eval(
                        'div[class="application-dates"] > span',
                        (node) => node.innerText.trim()
                    );
                    job_posted_date = job_posted_date.substr(11);
                    dateTo = await self.pageDeep.$eval(
                        'div[class="application-dates"] > span:nth-child(2)',
                        (node) => node.innerText.trim()
                    );
                    if (job_posted_date.includes('Deadline')) {
                        job_posted_date = job_posted_date.substr(10);
                    } else {
                        dateTo = dateTo.substr(15);
                    }
                } catch (e) {
                    console.log('Nėra datų >> ' + job_title);
                }
                let img = false;
                try {
                    // tikrina ar turi nuotrauka
                    let image = await self.pageDeep.$eval(
                        '#page-main-content > img',
                        (node) => node.textContent
                    );
                } catch (e) {
                    img = true;
                }
                if (img) {
                    // jeigu yra nuotrauka eina jie nx
                    let text = '';
                    let check = 'link';
                    try {
                        check = await self.pageDeep.$eval(
                            '#page-main-content iframe',
                            (node) => node.getAttribute('src')
                        );
                    } catch (e) {
                        check = null;
                    }
                    if (check) {
                        let src = website.concat(check);
                        self.pageDDeep = await self.browser.newPage(); // atidaromas naujas nagrinejamo skelbimo puslapis
                        await self.pageDDeep.goto(src, {
                            waitUntil: 'networkidle2',
                        });
                        try {
                            text = await self.pageDDeep.evaluate(
                                () => document.querySelector('body').innerText
                            );
                        } catch (e) {
                            console.log('>:(');
                        }
                    } else {
                        try {
                            text = await self.pageDeep.evaluate(
                                () => document.querySelector('body').innerText
                            );
                        } catch (e) {
                            console.log(':|');
                        }
                    }
                    text;
                    console.log(i + ' ' + job_title + ' +'); // isspausdiname nagrinejamo skelbimo pavadinima
                    i = i + 1; // didiname indeksa
                    results.push({
                        // sudedame visus duomenys i results masyva
                        job_title,
                        job_posted_date,
                        salary,
                        company,
                        text,
                        website,
                    });
                } else {
                    console.log(
                        i + ' ' + job_title + ' - ***** uždėję nuotrauką'
                    ); // isspausdiname nagrinejamo skelbimo pavadinima
                }
            } else {
                console.log('****, kažkoki youtube linka davė');
            }
        }
        return results; // graziname masyva
    },
};

module.exports.startCvOnline = async function (amount) {
    await self.initialize('informacines-technologijos?page=0#JobAds');
    return await self.getResults(amount);
};
