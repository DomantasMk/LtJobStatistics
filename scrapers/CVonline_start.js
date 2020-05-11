const cvonline = require('./CVonline_scraper');
(async () => {
    await cvonline.initialize('informacines-technologijos?page=0#JobAds'); // inicijuojamas cvonline, nurodant pirma puslapi
    let results = await cvonline.getResults(5); // paleidziama programa su norimu duomenu kiekiu *bet is tikro pagal puslapius :DDD*
    console.log(results);
    debugger; // sustabdyti programai, patikrinti duomenis
})();
