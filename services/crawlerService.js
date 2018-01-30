const url = require('url');
const cheerio = require('cheerio');
const request = require('request');
const validUrl = require('valid-url');

const crawlerService = (function() {

    let crawlerService = function() {
    };


    crawlerService.prototype.getPageInfo = function(uri) {
        
        return new Promise(
            function(resolve, reject) {
                request({
                    method: 'GET',
                    url: uri
                }, function(err, response, body) {
                    if (err) reject(err);
                
                    $ = cheerio.load(body);
            
                    let title = $('meta[property="og:title"]').attr('content') || $("title").text();
                    let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
                    
                    let image = $('meta[property="og:image"]').attr('content')
                    let iconUrl = $('link[rel=icon]').attr('href') || $('img').first().attr('src');
                    let icon = '';

                    if (iconUrl){
                        icon = validUrl.isUri(iconUrl) ? iconUrl : url.parse(uri, true, true).hostname + iconUrl;
                    } else {
                        icon = 'http://via.placeholder.com/350x150?text=sem-imagem';
                    }

                    resolve({title: title, description: description, image: image, icon: icon});
                });
            }
        );
    }

    return crawlerService;

})();

module.exports = crawlerService;

