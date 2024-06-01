var express = require('express');
const GamingModel = require("../DataBase/gaming")
const fs = require("fs")
const path = require("path")
const upload = require('../Multer/multer');
var router = express.Router();
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '..', '..' , 'views' , 'Gaming'));
app.set('view engine', 'ejs');

router.post('/gaupload', upload.single('gamingfile'), async (req, res) => {
  const post = await GamingModel.find();
  let posts = post.length;
  let pages = posts / 24
  let page = Math.round(pages)
  try {
    const created = GamingModel.create({
      postname: req.body.gamingtext,
      postheading: req.body.gamingheading,
      image: req.file.filename,
    });
    if (posts % 24 == 0) {
      // creating page section
      const fileName = `${page}.ejs`;
      const filePath = path.join(__dirname, '..', '..' , 'views' , ' Gaming' , fileName);
      const filecontent =
        `<!DOCTYPE html>
      <html>
      <head>
      <%- include('../Template-Engine/gami') %>
      </head>
      
      <body>
      
        <%- include('../header.ejs') %>
      
        <main>
      <span class="present-page">page<%= PostPerPage %></span>
          <h2 class="text-center m-tb heading-color">Gaming</h2>
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
                          <a href="/<%= element.postheading %>" class="link">Read Mor,</a>
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
  res.redirect('/categories/Gaming')
});

router.get('/categories/Gaming', async function (req, res, next) {
  try {
    let posts = await GamingModel.find()
    const finalPosts = posts.slice(-24)
    let post = 24
    res.render('Gaming/Gaming', { finalPosts, post });
  } catch (error) {
    res.render('error', { error });
  }
});
router.get('/Gaming/:slug', async function (req, res, next) {
  try {
    let PostPerPage = parseInt(req.params.slug);
    minpost = PostPerPage * -24
    maxpost = (PostPerPage + 1) * -24
    let posts = await GamingModel.find()
    let post = 24
    let postslength = posts.length
    let pagereach = postslength / 24
    let roundednumber = Math.floor(pagereach)
    if (PostPerPage > roundednumber) {
      res.redirect(roundednumber)
    }
    const finalPosts = posts.slice(maxpost, minpost)
    res.render(`Gaming/${req.params.slug}`, { finalPosts, post, PostPerPage, roundednumber });
  } catch (error) {
    res.render('error', { error });
  }
});

module.exports = router;
