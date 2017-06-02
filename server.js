const express = require('express');
const multer = require('multer');

const app = express();
var upload = multer();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).type('text/html');
  res.write('<p>Submit a file to view its size in bytes.</p>');
  res.write('<form action="/get-file-size" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="fileToUpload"> &nbsp;');
  res.write('<input type="submit">');
  res.write('</form>');
  res.end();
});

app.post('/get-file-size', upload.single('fileToUpload'), (req, res) => {
  const size = req.file.size
  res.json({size: size});
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;