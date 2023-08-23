 var express = require('express');
 var app = express();
 
 app.get('/search/news', (req, res)=> {
     const client_id = 'lWI2_tTU3vwz6QeqXXA8';
     const client_secret = '98A9hbdzzf';
     const api_url = 'https://openapi.naver.com/v1/search/news?display=100&sort=sim&query=' + encodeURI('반려동물'); // json 결과
     var request = require('request');
     const option = {};
     const options = {
        url: api_url, qs: option,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, (error, response, body)=> {
      if (!error && response.statusCode == 200) {
        let newsItems = JSON.parse(body).items;
        const newsArray = [];
        for(let i=0; i< newsItems.length; i++){
            let newsItem = {};
            newsItem.title=newsItems[i].title.replace(/&apos;|(<([^>]+)>)|&quot;/ig,"");
            newsItem.link=newsItems[i].link.replace(/&apos;|(<([^>]+)>)|&quot;/ig,"");
            newsItem.description=newsItems[i].description.replace(/&apos;|(<([^>]+)>)|&quot;/ig,"");
            newsItem.pubDate=newsItems[i].pubDate.replace(/&apos;|(<([^>]+)>)|&quot;/ig,"");
            newsArray.push(newsItem);
        }
     res.json(newsArray);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
  app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/search/news app listening on port 3000!');
  });

 module.exports = app;