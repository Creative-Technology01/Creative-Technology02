var express = require('express');
const fs = require("fs")
const path = require("path")
const bodyParser = require('body-parser');
var router = express.Router();
var app = express()
app.use(bodyParser.json());
app.set('view engine', 'ejs');

router.post('/data', async (req, res) => {
  const receivedData = req.body.content;
  const receivedhead = req.body.head;
  const slugs = req.query.slug;
  const slug = slugs.slice(0, -4);

  if (!slug) {
      return res.status(400).send('Slug parameter is missing');
  }
  if (!receivedData) {
      return res.status(400).send('No data received');
  }

  console.log(`Received request for slug: ${slug}`);

  let data = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head id="head">
      ${receivedhead}
  </head>
  <body id="HtmlBody">
    ${receivedData}
  </body>
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
    <script src="/javascripts/blog13.js"></script>
    <script src="/javascripts/center.js"></script>
  </html>`;

  let filename = `${slug}.ejs`; // Adding .ejs extension if it's not provided
  console.log('File Name is ', filename);
  let filepath = path.join(__dirname, '..', '..', 'views', 'CreateBlogStore', filename);

  fs.writeFile(filepath, data, (error) => {
      if (error) {
          console.error('Error writing file:', error);
          return res.status(500).send('Error writing file');
      }
      res.status(200).send('File created successfully');
  });
});

module.exports = router;