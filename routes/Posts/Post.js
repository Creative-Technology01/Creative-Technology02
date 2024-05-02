var express = require('express');
const PostModel = require("../DataBase/users")
const fs = require("fs")
const path = require("path")
const upload = require('../Multer/multer');
const axios = require('axios');
const cheerio = require('cheerio');
const { error } = require('console');
const bodyParser = require('body-parser');
var router = express.Router();
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views", 'page'));
app.set('view engine', 'ejs');
router.use(bodyParser.text());


router.post('/upload', upload.single('file'), async (req, res) => {
  const post = await PostModel.find();
  try {
    const created = PostModel.create({
      postname: req.body.text,
      postheading: req.body.heading,
      image: req.file.filename,
    });
    req.session.postData = created;
    // creating page section
    let page = post / 24
    const fileName = `${page}.ejs`;
    const filePath = path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views\\", 'page', fileName);
    const filecontent =
      `<!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Page: Page(<%= PostPerPage %> out of <%= roundednumber%>) Creative Technology</title>
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
          <h2 class="text-center m-tb heading-color">Latest Articles</h2>
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
    // blog page
    let filename = req.body.heading
    let blogfilename = `${filename}.ejs`
    let filedata = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documnet</title>
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
      
      <header class="relative" id="header">
          <li class="items logo" style="list-style: none;"><a href="/">Creative-Technology</a></li>
  
          <nav class="blog-header-nav">
              <ul class="navlinks">
                  <li class="items"><span class="material-symbols-outlined">
                          add
                      </span>
                      <div class="menu absolute">
                          <ul class="flex space-evenly menu-ul">
                              <li class="menu-list">Text
                                  <div class="sub-menu none absolute">
                                      <ul class="sub-menu-ul flex space-evenly">
                                          <li id="Paragraph" style="color: inherit;">Paragraph</li>
                                          <li id="Heading">Heading</li>
                                          <li id="List">List</li>
                                      </ul>
                                  </div>
                              </li>
                              <li class="menu-list">Media
                                  <div class="sub-menu none absolute">
                                      <ul class="sub-menu-ul flex space-evenly">
                                          <li id="addFileButton">File</li>
                                          <li id="addGalleryButton">Gallery</li>
                                          <li id="addAudioButton">Audio</li>
                                          <li id="add-video-button">Video</li>
                                      </ul>
                                  </div>
                              </li>
                              <li class="menu-list">Align
                                  <div class="sub-menu none absolute">
                                      <ul class="sub-menu-ul flex space-evenly">
                                          <li id="Button">Button</li>
                                          <li id="Colums">Colums</li>
                                          <li id="Group">Group</li>
                                          <li id="Row">Row</li>
                                          <li id="Center">Center</li>
                                      </ul>
                                  </div>
                              </li>
                              <li class="menu-list">Design
                                  <div class="sub-menu none absolute">
                                      <ul class="sub-menu-ul flex space-evenly">
                                          <li id="InsertHeader">Header</li>
                                          <li id="InsertFooter">Footer</li>
                                      </ul>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li class="items"><span class="material-symbols-outlined">
                          edit
                      </span>
                      <div class="items-sub-menu">
                          <ul>
                              <li id="select">Select</li>
                              <li id="edit">Edit</li>
                          </ul>
                      </div>
                  </li>
                  <li class="items" id="save"><lord-icon src="https://cdn.lordicon.com/xpgofwru.json" trigger="hover" colors="primary:#ffffff">
                      </lord-icon></li>
                  <button class="items" id="Publish">Publish</button>
  
                  <li><a href="#"><ion-icon name="menu-outline"></ion-icon></a></li>
              </ul>
          </nav>
      </header>
      <main id="HtmlMain">
      <div class="container" id="container">
      <div class="Heading margin-top-bottom heading-color">
      <h1 contenteditable="true" aria-label="Add Title" role="textbox" aria-multiline="true" id="mainHeading" class="fonts outline" style="color: inherit;">
          Add Title
      </h1>
  </div>
  <div class="Paragraph margin-top-bottom ">
      <p contenteditable="true" aria-label="Paragraph" role="textbox" aria-multiline="true" id="Paragraph"
          class="fonts outline">
          Write Paragraph
      </p>
  </div>
  </div>
      </main>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <script src="/javascripts/Index.js"></script>
      <script src="/javascripts/blog11.js"></script>
      <script src="/javascripts/Heading.js"></script>
      <script src="/javascripts/blog2.js"></script>
      <script src="/javascripts/blog3.js"></script>
      <script src="/javascripts/blog4.js"></script>
      <script src="/javascripts/blog5.js"></script>
      <script src="/javascripts/blog6.js"></script>
      <script src="/javascripts/blog7.js"></script>
      <script src="/javascripts/blog8.js"></script>
      <script src="/javascripts/blog9.js"></script>
      <script src="/javascripts/blog10.js"></script>
      <script src="/javascripts/ralis.js"></script>
      <script src="/javascripts/blog12.js"></script>
      <script src="/javascripts/center.js"></script>
    </body>
    </html>`
    let blogfilepath = path.join("C:\\Users\\HP\\Desktop\\Creative-Technology\\views\\", 'CreateBlogStore', blogfilename);
    fs.writeFile(blogfilepath, filedata, (error) => {
      if (error) {
        res.render('error', { error })
      }
    })
    res.redirect(`/trial/${blogfilename}`)
  } catch (error) {
    res.render('error', { error })
  }
});




router.post('/host', async (req, res) => {
  let filename = `${req.query.slug}`
  let initalpath = path.resolve(__dirname, '..', '..' + '\\views\\CreateBlogStore\\' + filename);
  let finalpath = path.resolve(__dirname, '..', '..' + '\\views\\blogpost\\' + filename);
  if (fs.existsSync(initalpath)) {
    // Move the file to the destination folder
    fs.rename(initalpath, finalpath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        res.status(500).send('Error moving file');
      } else {
        console.log('File moved successfully');
        res.status(200).send('File moved successfully');
      }
    });
  } else {
    res.status(404).send('File not found in source folder');
  }
});


router.get('/page', async function (req, res, next) {
  try {
    let posts = await PostModel.find()
    let post = 24
    const finalPosts = posts.slice(-24)
    res.render('page/page', { finalPosts, post });
  } catch (error) {
    res.render('error', { error });
  }
});
router.get('/page/:slug', async function (req, res, next) {
  try {
    let PostPerPage = parseInt(req.params.slug);
    minpost = PostPerPage * -24
    let post = 24
    maxpost = (PostPerPage + 1) * -24
    let posts = await PostModel.find()
    let postslength = posts.length
    let pagereach = postslength / 24
    let roundednumber = Math.floor(pagereach)
    if (PostPerPage > roundednumber) {
      res.redirect(roundednumber)
    }
    const finalPosts = posts.slice(maxpost, minpost)
    res.render(`page/${req.params.slug}`, { finalPosts, PostPerPage, post, roundednumber });
  } catch (error) {
    res.render('error', { error });
  }
});

module.exports = router;