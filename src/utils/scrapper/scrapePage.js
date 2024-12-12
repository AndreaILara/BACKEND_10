
const scrapeData = require('./scrapper');

const scrapePage = async () => {
    const url = 'https://example.com/boardgames';
    const data = await scrapeData(url);
    console.log('Scraped Data:', data);
};

scrapePage();
