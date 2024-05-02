var express = require('express');
const iosModel = require("../DataBase/ios")
const fs = require("fs")
const path = require("path")
const upload = require('../Multer/multer');
var router = express.Router();
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views", 'IOS'));
app.set('view engine', 'ejs');


let page = 1
router.post('/iupload', upload.single('iosfile'), async (req, res) => {
  const post = await iosModel.find();
  try {
    const created = iosModel.create({
      postname: req.body.iostext,
      postheading: req.body.iosheading,
      image: req.file.filename,
    });

    // creating page section
    
    page++;
    
    const fileName = `${page}.ejs`;
    const filePath = path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views\\", 'IOS', fileName);
    const filecontent =
    `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>IOS: Page(<%= PostPerPage %> out of <%= roundednumber%>) Creative Technology</title>
      <link rel="stylesheet" href="/stylesheets/style.css">
      <link rel="stylesheet" href="/stylesheets/main.css">
      <link rel="stylesheet" href="assets/header-fixed.css">
      <link rel="stylesheet" href="/stylesheets/utility.css">
      <link rel="stylesheet" href="/stylesheets/page.css">
      <link rel="stylesheet" href="/stylesheets/footer.css">
      <link rel="stylesheet" href="/stylesheets/responsive.css">
      <link rel="icon" type="image/x-icon" href="/path/to/your/favicon.ico">
      <link href='https://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
    
    </head>
    
    <body>
    
      <%- include('../header.ejs') %>
    
      <main>
      <span class="present-page">page<%= PostPerPage %></span>
        <h2 class="text-center m-tb heading-color">IOS</h2>
        <section class="m-b p-tb">
        <div class="pair-set flex flex-wrap space-evenly">
            <% finalPosts.reverse().forEach(element=> { %>
              <div class="flex space-evenly space">
                <div class="3pair-set">
                  <div class="card">
                    <img src="/images/upload/<%= element.image %>" class="card-img-top p-tb flex justify-center"
                      alt="...">
  
                    <div class="card-body">
                      <div class="card-title">
                        <h2>
                          <%=element.postheading%>
                            </h2>
                      </div>
                      <p class="card-text p-tb  link-bottom">
                        <%= element.postname %>
                      </p>
                      <div class="flex justify-center">
                        <a href="/<%= element.postheading %>" class="link">Go somewhere</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <% }); %>
          </div>
          <div class="forwar-backward flex">
          <div class="backward">
            <a href="<%= PostPerPage-1%> " class="forward-link">Previous Page</a>
          </div>
          <% if(post == finalPosts.length){ %>
            <div class="forward">
              <a href= "<%= PostPerPage+1%>" class="forward-link">Next Page</a>
            </div>
          <% } %>
        </div>
      </section>
    
      </main>
    
      <div class="pg-footer">
        <%- include('../footer.ejs') %>
      </div>
    
    
    </body>
    <script src="/javascripts/Index.js"></script>

    </html>`
    fs.writeFile(filePath, filecontent, (error) => {
      if (error) {
        res.render('error', { error })
      }
    })
  } catch (error) {
    res.render('error', { error })
  }
  res.redirect('/categories/IOS')
});

router.get('/categories/IOS', async function (req, res, next) {
  try {
    let posts = await iosModel.find()
    const finalPosts = posts.slice(-24)
    let post = 24
    res.render('IOS/IOS', { finalPosts  , post});
  } catch (error) {
    res.render('error', {error});
  }
});
router.get('/IOS/:slug', async function (req, res, next) {
  try {
    let PostPerPage = parseInt(req.params.slug);
    minpost = PostPerPage * -24
    maxpost = (PostPerPage+1) * -24
    let posts = await iosModel.find()
    let post = 24
    let postslength = posts.length
    let pagereach = postslength/24
    let roundednumber = Math.floor(pagereach)
    if(PostPerPage>roundednumber){
      res.redirect(roundednumber)
    }
    const finalPosts = posts.slice(maxpost , minpost)
    res.render(`IOS/${req.params.slug}`, { finalPosts , post , PostPerPage , roundednumber});
  } catch (error) {
    res.render('error', {error});
  }
});

module.exports = router;
