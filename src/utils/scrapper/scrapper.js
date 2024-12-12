
const puppeteer = require('puppeteer');

const scrapeData = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const data = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.item')).map((item) => ({
                title: item.querySelector('.title')?.innerText || 'N/A',
                price: item.querySelector('.price')?.innerText || 'N/A',
            }));
        });

        await browser.close();
        return data;
    } catch (error) {
        console.error('Scraping failed:', error);
        return [];
    }
};

module.exports = scrapeData;
