// https://medium.com/khojchakra/a-simple-nodejs-server-without-express-js-6773122d365f

// const answer = [];
// const story = {
//     title,
//     link
// };


const http = require('http');
const https = require('https');

const liElement = '<li class="latest-stories__item">';   //33
const regexExp = "([\"'])(?:(?=(\\\\?))\\2.)*?\\1";

//create a server object:
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'}); // http header
let url = req.url;
 if(url ==='/about'){
    res.write('<h1>about us page<h1>'); //write a response
    res.end(); //end the response
 }else if(url ==='/contact'){
    res.write('<h1>contact us page<h1>'); //write a response
    res.end(); //end the response
 } else if(url === '/getTimeStories'){
    let page = callPage();
    page.then(data => {
      //  console.log(data);
      let indexes = getIndices(liElement,data);

      });
   //  story.title = "a"; 
   //  story.link = "b";
   //  answer.push(story);
 }
 else{
    res.write('<h1>Hello World!<h1>'); //write a response
    res.end(); //end the response
 }
}).listen(3000, function(){
 console.log("server start at port 3000"); //the server object listens on port 3000
});


 const options = {
   hostname: 'time.com',
   port: 443,
   path: '/',
   method: 'GET',
}
 
const callPage = () => {
   return new Promise((resolve, reject) => {
      var page = "";
      const req = https.request(options, res => {
         // console.log(`statusCode: ${res.statusCode}`);
         if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error('statusCode=' + res.statusCode));
         }
         res.on('data', d => {
            page += d;
         }).on('end', () => {
            resolve(page);
         })
      });

      req.on('error', error => {
         console.error(error);
         reject(error.message);
      });

      req.end();
      
   });

} 


const getIndices = (sourceStr, searchStr) =>
{
   const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
   return indexes;
};

function extractSummary(regex ,iCalContent) {
   var arr = rx.exec(iCalContent);
   return arr[1]; 
 }