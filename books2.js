const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

const getLinks=async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    const links = await page.$$eval('.product_pod .image_container a', allAs => allAs.map(a => a.href));
    await browser.close()
    return links;
};

const getBookData=async(url,page)=>{
    await page.goto(url);
    const h1=await page.$eval('.product_main h1',h1=>h1.textContent)
    const price=await page.$eval('.product_main .price_color',price=>price.textContent)
    const inStock=await page.$eval('.product_main .instock.availability',inStock=>inStock.innerText)
    return {
        title:h1,
        price:price,
        inStock:inStock
    }
}

const main=async()=>{
    const allLinks=await getLinks();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const scrappedData=[];
    for (let link of allLinks) {
        const data=await getBookData(link,page)
        scrappedData.push(data);
    }
    // console.log(scrappedData)
    console.log("Done!")
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(scrappedData)
    xlsx.utils.book_append_sheet(wb, ws)
    xlsx.writeFile(wb, "booksData.xlsx")
    await browser.close();
}
main();