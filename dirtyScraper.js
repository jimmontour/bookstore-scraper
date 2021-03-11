const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://www.imdb.com/title/tt0111161/?ref_=fn_al_tt_1';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Screenshot some data:
  await page.screenshot({ path: 'example.png' });

  //   Evaluate some data:
  const data = await page.evaluate(() => {
    const title = document.querySelector('div[class="title_wrapper"] > h1')
      .innerText;
    const rating = document.querySelector('span[itemprop="ratingValue"]')
      .innerText;

    return {
      title,
      rating,
    };
  });

  console.log(data);
  await browser.close();
})();
