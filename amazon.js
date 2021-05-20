const puppeteer = require('puppeteer');

const product = "smartphones";
const minPrice = 1000;
const maxPrice = 5000;

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();

    await page.goto('https://www.amazon.in/')
    await page.waitForSelector('#twotabsearchtextbox')
    await page.type('#twotabsearchtextbox', product, { delay: 100 });
    await page.keyboard.press(String.fromCharCode(13));
    await page.waitForSelector('#low-price');
    await page.type('#low-price', minPrice.toString());
    await page.type('#high-price', maxPrice.toString());
    await page.click('.a-button-input');
    await page.waitForSelector('.sg-col-inner')
    const productsLinks = await page.evaluate(() => {
        const products = document.querySelectorAll('.sg-col-inner a')
        let array = [];
        products.forEach(elem => {
            array.push(elem.href)
        })
        return array;
    })
    console.log(productsLinks)

    await browser.close();
})();