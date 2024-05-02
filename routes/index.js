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
const fs = require("fs")
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
router.use(bodyParser.text());
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

router.get('/:slug', (req, res, next) => {
  try {
    slug = req.params.slug;
    if (slug == "page") {
      next()
      return
    }
    res.render(`blogpost/${req.params.slug}`)
  } catch (error) {
    res.render('error', { error: 'Page Not Found' })
  }
})
router.get('/trial/:slug', (req, res, next) => {
  try {
    slug = req.params.slug;
    if (slug == "page") {
      next()
      return
    }
    res.render(`CreateBlogStore/${req.params.slug}`)
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
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Creative-Technology</title>
      <link rel="stylesheet" href="/stylesheets/blog-post.css">
      <link rel="stylesheet" href="/stylesheets/blog-post-utlity.css">
      <link rel="stylesheet" href="/stylesheets/style.css">
      <link rel="stylesheet" href="/stylesheets/main.css">
      <link rel="stylesheet" href="/stylesheets/utility.css">
      <link rel="stylesheet" href="/stylesheets/page.css">
      <link rel="stylesheet" href="/stylesheets/footer.css">
      <link rel="stylesheet" href="/stylesheets/responsive.css">
      <link rel="stylesheet" href="/stylesheets/chnages.css">
      <link rel="stylesheet" href="/stylesheets/blogpost-responsive.css">
      <link href='https://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
  
      <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  </head>
  
  <body id="HtmlBody">
    ${receivedData}
  </body>
  </html>`
  let filename = `${URL}`
  console.log(filename)
  let filepath = path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views\\", 'CreateBlogStore', filename)
  fs.writeFile(filepath, data, (error) => {
    if (error) {
      res.render('error', { error })
    }
  })
})
module.exports = router;