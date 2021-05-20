const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto('https://quotes.toscrape.com/')
    const title = await page.title();
    const url = await page.url();
    console.log(title, url);
    await page.waitForSelector('.col-md-4');
    await page.click('.col-md-4 a');
    await page.waitForSelector('#username')
    await page.type('#username', 'ashish badgujar', { delay: 100 });
    await page.type("#password", 'ashish123', { delay: 100 });
    await page.click('.btn.btn-primary')

    await browser.close();
})();