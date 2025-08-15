// app.js

const http = require('http');
const url = require('url');

// Import your local modules (Ensure these paths are correct - ./modules/moduleName)
const rootContentGenerator = require('./modules/root_module');
const aboutContentGenerator = require('./modules/about_module');
const contactContentGenerator = require('./modules/contact_module');
const galleryContentGenerator = require('./modules/gallery_module');     
const nonFoundContentGenerator = require('./modules/not_found_module'); 
const footerContentGenerator = require('./modules/footer_module');     

const PORT = 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

 
    let pageContent = '';
    let pageTitle = '';
    let statusCode = 200; 

    const userName = "John Smith";

    switch (path) {
        case '/':
            pageTitle = 'Welcome to my Node.js Application';
            pageContent = `<h1>${pageTitle}</h1><p>${rootContentGenerator.getRootContent(userName)}</p>`;
            break;
        case '/about':
            pageTitle = 'This is the About Page';
            pageContent = `<h1>${pageTitle}</h1><p>${aboutContentGenerator.getAboutContent(userName)}</p>`;
            break;
        case '/contact':
            pageTitle = 'This is the Contact Page';
            pageContent = `<h1>${pageTitle}</h1><p>${contactContentGenerator.getContactContent(userName)}</p>`;
            break;
        case '/gallery':
            pageTitle = 'This is the Gallery Page';
            pageContent = `<h1>${pageTitle}</h1><p>${galleryContentGenerator.getGalleryContent()}</p>`;
            break;
        default:
            statusCode = 400;
            pageTitle = 'Invalid Request';
            pageContent = `<h1>${pageTitle}</h1><p>${nonFoundContentGenerator.getNonFoundContent()}</p>`;
            break;
    }

    res.writeHead(statusCode, { 'Content-Type': 'text/html' });


    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${pageTitle}</title>
        </head>
        <body>
            ${pageContent}
            ${footerContentGenerator.getFooterContent()}
        </body>
        </html>
    `);

    res.end(); // End the response
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

/*
Your Name: Manaloto, Johnzelle
Date: 16/07/2025
Section: WD - 301
*/