const fs = require('fs');
const http = require('http'); //network capabilities
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');



const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8'); // __dirname = where the current file is located
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8'); // __dirname = where the current file is located
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8'); // __dirname = where the current file is located



const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8'); // __dirname = where the current file is located
const dataObj = JSON.parse(data);


const server = http.createServer((req, res)=>{

    const { query, pathname } = url.parse(req.url, true);
    

    //Overview page
    if(pathname==='/' || pathname ==='/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    //Product page    
    }else if(pathname ==='/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    

    // API    
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data); // __dirname = where the current file is located
    }  
    
    
    //Not found
    else {
        res.writeHead(404,{
         'Content-type': 'text/html' //the content we are sending is html  
        });
        res.end('<h1>Page NOT FOUND!!</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening to request on port 8000');
})


