var express = require('express');
const PostModel = require("./DataBase/users")
const AndroidModel = require("./DataBase/android")
const WindowModel = require("./DataBase/window")
const iosModel = require("./DataBase/ios")
const macModel = require("./DataBase/mac")
const GadgetsModel = require("./DataBase/gadgets")
const GamingModel = require("./DataBase/gaming")
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path")
const natural = require('natural');
const fs = require("fs")
const { JSDOM } = require('jsdom');
var router = express.Router();
var app = express()
app.set('view engine', 'ejs');
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
router.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));



// upload section
router.get('/creative-pritesh/technology-gupta/:slug', async function (req, res, next) {
  res.render(`upload/${req.params.slug}`);
});


// Main section to show created post

router.get('/', async function (req, res, next) {
  const latestpost = await PostModel.find()
  const latestposts = latestpost.slice(-6)

  const recommmendedpost = latestpost.slice(-12, -9)

  const androidposts = await AndroidModel.find()
  const androidpost = androidposts.slice(-3)

  const windowposts = await WindowModel.find()
  const windowpost = windowposts.slice(-3)

  const iosposts = await iosModel.find()
  const iospost = iosposts.slice(-3)

  const macposts = await macModel.find()
  const macpost = macposts.slice(-3)

  const Gadgetsposts = await GadgetsModel.find()
  const Gadgetspost = Gadgetsposts.slice(-3)

  const Gamingposts = await GamingModel.find()
  const Gamingpost = Gamingposts.slice(-3)

  const posts = await PostModel.find().sort({ lastUpdated: -1 });
  res.render('index', { recommmendedpost, latestposts, androidpost, windowpost, iospost, macpost, Gadgetspost, Gamingpost, posts });
})



// other pages


router.get('/creative-technology/:slug', async (req, res, next) => {
  try {
    res.render(`creative-technology/${req.params.slug}`)
  }
  catch (error) {
    res.render('error', { error: "Page Not Found" })
  }
});

// blog page rendering

function stripHtml(html) {
  // Remove specific unwanted patterns first
  const unwantedPatterns = /<%- include\(['"].+?['"]\)%>|<!DOCTYPE html>|<html lang="en">|<head>[\s\S]*?<\/head>|<body>|<\/body>|<\/html>|<p\b[^>]*>|<\/p>/g;
  let cleanedHtml = html.replace(unwantedPatterns, '');

  // Use JSDOM to parse the cleaned HTML
  const dom = new JSDOM(cleanedHtml);
  const document = dom.window.document;

  // Remove any remaining script, style, and link elements
  const elementsToRemove = document.querySelectorAll('script, style, link');
  elementsToRemove.forEach(element => element.remove());

  let textContent = document.body.textContent || "";
  textContent = textContent.replace(/\s\s+/g, ' ').trim(); // Replace multiple spaces with a single space and trim
  textContent = textContent.replace(/&amp;#39;|&#39;/g, " "); // Convert HTML entities back to single quotes
  return textContent;
}
// Function to analyze content and generate metadata
function generateMetadata(content, slugs) {
  const textContent = stripHtml(content);
  const summary = textContent.substring(0, 250);
  const words = textContent.split(/\s+/);
  const wordFreq = words.reduce((freq, word) => {
    const lowerCaseWord = word.toLowerCase();
    freq[lowerCaseWord] = (freq[lowerCaseWord] || 0) + 1;
    return freq;
  }, {});

  // Extract keywords from the title, excluding numbers
  const slugsWords = slugs.split(/\s+/);
  let keywords = slugsWords.filter(word => !/\d/.test(word)); // Exclude words containing numbers

  // Limit the number of keywords if needed
  keywords = keywords.slice(0, 10); // Limit to top 10 keywords

  // If no keywords extracted from the title, fallback to content-based keywords
  if (keywords.length === 0) {
    keywords = Object.keys(wordFreq)
      .sort((a, b) => wordFreq[b] - wordFreq[a])
      .filter(word => word.length > 3) // Filter out short words
      .slice(0, 10); // Extract top 10 words as keywords
  }

  console.log(slugs);
  const meta_name = slugs.slice(0, -4); // Assuming slugs end with ".html" and you want to remove it
  const url = `https://www.creative-technology.tech/${meta_name}`;
  const meta_title = meta_name;
  const metadata = {
    title: meta_title, // Use provided title
    description: summary,
    keywords: keywords.join(', '),
    author: 'Creative-Technology Team',
    url: url,
  };

  return metadata;
}




router.get('/:slug', (req, res, next) => {
  try {
    const slugs = req.params.slug;
    const slug = slugs.slice(0, -4); // Assuming slugs end with ".html" and you want to remove it
    const blogContent = getBlogContentById(slugs);
    const metadata = generateMetadata(blogContent, slugs); // Assuming you want to pass a placeholder title
    if (slugs === "page") {
      next();
      return;
    }
    res.render(`blogpost/${slugs}`, { slug: slug, content: blogContent, metadata });
  } catch (error) {
    res.render('error', { error });
  }
});

function getBlogContentById(slugs) {
  // This function should fetch the content from a database or file based on the ID
  // For this example, we'll read from a static file
  const filePath = path.join(__dirname, '..', '\\views\\blogpost\\', `${slugs}.ejs`);
  return fs.readFileSync(filePath, 'utf8');
}


router.get('/trial/:slug', (req, res, next) => {
  try {
    const slugs = req.params.slug;
    const slug = slugs.slice(0, -4);

    if (slug == "page") {
      next()
      return
    }
    res.render(`CreateBlogStore/${req.params.slug}`, { slug: slug })
  } catch (error) {
    res.render('error', { error: 'Page Not Found' })
  }
})

router.post('/data', async (req, res) => {
  const receivedData = req.body;
  const URL = req.query.slug;
  let data = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
  <%- include('../Template-Engine/blog') %>
  </head>
  
  <body id="HtmlBody">
    ${receivedData}
  </body>
  </html>`
  let filename = `${URL}`
  console.log(filename)
  let filepath = path.join(__dirname, '..' + '\\views' + '\\CreateBlogStore', filename)
  fs.writeFile(filepath, data, (error) => {
    if (error) {
      res.render('error', { error })
    }
  })
})
module.exports = router;