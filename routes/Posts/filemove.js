var express = require('express');
const fs = require("fs")
const path = require("path")
const bodyParser = require('body-parser');
var router = express.Router();
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
router.use(bodyParser.text());

router.post('/host', async (req, res) => {
    try {
        let filename = `${req.query.slug}`;
        console.log(filename)
        const receivedData = req.body.content;
        const receivedhead = req.body.head;
        console.log('data',receivedData)
        console.log('head',receivedhead)
        let initialPath = path.resolve(__dirname, '..', '..', 'views', 'CreateBlogStore', filename);
        let finalPath = path.resolve(__dirname, '..', '..', 'views', 'blogpost', filename);
        let fileContent = `
            <!DOCTYPE html>
        <html lang="en">
        
       <head id="head">
            ${receivedhead}
      </head>
        <body id="HtmlBody">
          ${receivedData}
        </body>
        <script src="/javascripts/Index.js"></script>
        </html>
        `;

        // Write the file asynchronously
        await fs.promises.writeFile(initialPath, fileContent);

        // Check if the file exists and move it asynchronously
        if (await fs.promises.access(initialPath).then(() => true).catch(() => false)) {
            await fs.promises.rename(initialPath, finalPath);
            console.log('File moved successfully');
            res.status(200).send('File moved successfully');
        } else {
            res.status(404).send('File not found in source folder');
        }
    } catch (error) { 
        console.error('Error:', error);
        res.status(500).render('error', { error });
    }
});

module.exports = router;