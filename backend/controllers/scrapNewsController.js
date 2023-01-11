const chromium = require('chrome-aws-lambda');
const cheerio = require('cheerio');
const News = require('../models/newsModel');
const mongoose = require('mongoose');

// scrap news 
const scrapNews = async(req, res, next)=>{
  try {
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    const newsContent = [];

        // Open URL in current page  
       await page.goto('https://bbc.com/news', { waitUntil: 'networkidle0' });
        await page.waitForSelector('.fc-consent-root');
        await page.click('.fc-cta-consent');
        

        // Return the HTML document
        const pageData = await page.evaluate(()=>{
            return {html: document.documentElement.innerHTML}
        });

        // Load the HTML object into Cheerio
        let $ = cheerio.load(pageData.html);

        // Loop through the HTML element and extract needed information
        $(".gs-c-promo").each(function(i, el){
            // get news headline
            const headline = $(el)
                .find('.gs-c-promo-heading__title')
                .text()
                .replace(/\s\s+/g, '').trim();
            
                // get news summary
            const summary = $(el)
            .find('.gs-c-promo-summary')
            .text()
            .replace(/\s\s+/g, '').trim();

            const detailLink = $(el)
            .find('.gs-c-promo-body a').attr('href')

            // get image source
            const image = $(el)
            .find('.gs-o-responsive-image img').attr('src')

            // store the data into object 
            let news = {
                title: headline,
                summary: summary,
                detailLink: 'https://www.bbc.com'+detailLink,
                image: image?image:null
            }

            // push the onject into array
          newsContent.push(news);
        })

        await browser.close();
    
    //Respond with scrapped data 
    res.status(200).json(newsContent);
  } catch (error) {
    console.log(error.message)
  }
  
  }

  // scrap news 
const scrapSingleNews = async(req, res, next)=>{
  try {
    //Get news id from url param 
  const {id} = req.params;
//   check to see if it is a valid id type
      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error: 'No such workout'});
      }

    //   Query to find the news item in Database
      const singleNews = await News.findById(id);
      
    //   Throw error if no news with matching item is found
       if(!singleNews){
        return res.status(404).json({error: 'No such news'});
       }

    //    Store the news link
       const newsLink = singleNews.detailLink;

    // Launch puppeteer 
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
      const page = await browser.newPage();

      // Open the news item URL  
     await page.goto(newsLink, { waitUntil: 'networkidle0' });

      // await page.waitForSelector('.ssrcss-pv1rh6-ArticleWrapper');

      // Return the HTML document
      const pageData = await page.evaluate(()=>{
          return {html: document.documentElement.innerHTML}
      });

      // Load the HTML object into Cheerio
      let $ = cheerio.load(pageData.html);

    // Extract title from page
      const title = $(".ssrcss-pv1rh6-ArticleWrapper").find('#main-heading').text();
      const body =  $('.ssrcss-11r1m41-RichTextComponentWrapper').text();
      const image = singleNews.image;
      const detailLink = singleNews.detailLink;
      const createdAt= singleNews.createdAt;

      await browser.close();
  
  //Respond with scrapped data 
  res.status(200).json({title: title, body: body, image: image, detailLink: detailLink, createdAt: createdAt, id: singleNews._id});
  } catch (error) {
    console.log(error.message)
  }

}

  module.exports = {scrapNews, scrapSingleNews}