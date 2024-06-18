var express = require('express');
const appleModel = require("../DataBase/Apple")
const fs = require("fs")
const path = require("path")
const upload = require('../Multer/multer');
var router = express.Router();
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '..', '..' , 'views' , 'apple'));
app.set('view engine', 'ejs');


router.post('/appleupload', upload.single('applefile'), async (req, res) => {
  const post = await appleModel.find();
  let posts = post.length;
  let pages = posts / 24
  let page = Math.round(pages)
  try {
    const created = appleModel.create({
      postname: req.body.appletext,
      postheading: req.body.appleheading,
      image: req.file.filename,
    });

    // creating page section

    if (posts % 24 === 0 && page >= 2) {
      const fileName = `${page}.ejs`;
      const filePath = path.join(__dirname, '..', '..' , 'views' , 'apple' , fileName);
      const filecontent =
        `<!DOCTYPE html>
    <html>
    <head>
    <%- include('../Template-Engine/apple1') %>
    </head>
    
    <body>
    
      <%- include('../header.ejs') %>
    
      <main>
      <span class="present-page">page<%= PostPerPage %></span>
        <h2 class="text-center m-tb heading-color">Apple</h2>
            <section class="m-b p-tb articles">
      <% finalPosts.reverse().forEach(element=> { %>
        <article class="article_tech_news_card">
          <div class="article-wrapper">
            <figure>
              <img src="/images/upload/<%= element.image %>" alt="" />
            </figure>
            <div class="article-body">
              <h2>
                <%= element.postheading%>
              </h2>
              <p>
                <%= element.postname %>
              </p>
              <a href="/<%= element.postheading%>" class="read-more">
                Read more <span class="sr-only">about this is some title</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </article>
        <% }); %>

          <div class="forwar-backward flex">
            <% if(post==finalPosts.length){ %>
              <div class="forward">
                <a href="/technews/1" class="forward-link">Next Page</a>
              </div>
              <% } %>
          </div>
    </section>
    
      </main>
      <%- include('../Template-Engine/follw') %>
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
    }
  } catch (error) {
    res.render('error', { error })
  }
  res.redirect('/categories/apple')
});

router.get('/categories/apple', async function (req, res, next) {
  try {
    let posts = await appleModel.find()
    const finalPosts = posts.slice(-24)
    let post = 24
    res.render('apple/apple', { finalPosts, post });
  } catch (error) {
    res.render('error', { error });
  }
});
router.get('/apple/:slug', async function (req, res, next) {
  try {
    let PostPerPage = parseInt(req.params.slug);
    minpost = PostPerPage * -24
    maxpost = (PostPerPage + 1) * -24
    let posts = await appleModel.find()
    let post = 24
    let postslength = posts.length
    let pagereach = postslength / 24
    let roundednumber = Math.floor(pagereach)
    if (PostPerPage > roundednumber) {
      res.redirect(roundednumber)
    }
    const finalPosts = posts.slice(maxpost, minpost)
    res.render(`apple/${req.params.slug}`, { finalPosts, post, PostPerPage, roundednumber });
  } catch (error) {
    res.render('error', { error });
  }
});

module.exports = router;
