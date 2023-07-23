// Create web server
// 1. Create a web server object
// 2. Start listening on a port
// 3. Process requests
// 4. Send response
// 5. Close the server

// 1. Create a web server object
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = fs.readFileSync('./comments.json', 'utf8');
comments = JSON.parse(comments);

var server = http.createServer(function(req, res) {
  console.log(req.method, req.url);

  var urlParts = url.parse(req.url);
  var resource = urlParts.pathname;
  var query = querystring.parse(urlParts.query);

  // 2. Start listening on a port
  if (req.method === 'GET') {
    if (resource === '/guestbook') {
      // 3. Process requests
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      var html = fs.readFileSync('./guestbook.html', 'utf8');
      var commentItems = comments.map(function(comment) {
        return `
          <li class="comment-item">
            <h3 class="comment-title">${comment.title}</h3>
            <p class="comment-content">${comment.content}</p>
          </li>
        `;
      });
      html = html.replace('{{COMMENT_ITEMS}}', commentItems.join(''));
      res.end(html);
    } else if (resource === '/style.css') {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      var css = fs.readFileSync('./style.css', 'utf8');
      res.end(css);
    } else if (resource === '/create') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      var html = fs.readFileSync('./create.html', 'utf8');
      res.end(html);
    } else if (resource === '/jquery-3.2.1.min.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript'
      });
      var js = fs.readFileSync('./jquery-3.2.1.min.js', 'utf8');
      res.end(js);
    } else if (resource === '/main.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript'
      });
      var js = fs.readFileSync('./main