var express = require('express');
const PostModel = require("./DataBase/users")
const AndroidModel = require("./DataBase/android")
const AIModel = require("./DataBase/AI")
const WindowModel = require("./DataBase/window")
const appleModel = require("./DataBase/Apple")
const technewsModel = require("./DataBase/technews")
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
  const technewsposts = await technewsModel.find()
  const technewspost = technewsposts.slice(-6)
  const tech_news_post_4card = technewsposts.slice(-4)
  const tech_news_post_3card = technewsposts.slice(-3)

  const ApplePosts = await appleModel.find()
  const Applepost = await ApplePosts.slice(-6)


  const aiPosts = await AIModel.find()
  const aipost = await aiPosts.slice(-6)


  const windowPosts = await WindowModel.find()
  const windowpost = await windowPosts.slice(-6)

  const Posts = await PostModel.find()
  const post = await Posts.slice(-3)

  const postformore = await Posts.slice(-6)
  res.render('index', {technewspost , tech_news_post_4card , tech_news_post_3card , Applepost ,aipost , windowpost , post , postformore});
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
    res.render(`blogpost/${slugs}`, { slug: slug, content: blogContent, metadata });
  } catch (error) {
    res.render('error', { error });
  }
});

function getBlogContentById(slugs) {
  // This function should fetch the content from a database or file based on the ID
  // For this example, we'll read from a static file
  const filePath = path.join(__dirname, '..', 'views','blogpost', `${slugs}.ejs`);
  return fs.readFileSync(filePath, 'utf8');
}

router.get('/trial/:slug', (req, res, next) => {
  try {
    const slugs = req.params.slug;
    const slug = slugs.slice(0, -4);
    res.render(`CreateBlogStore/${req.params.slug}`, { slug: slug })
  } catch (error) {
    res.render('error', { error: 'Page Not Found' })
  }
})
module.exports = router;